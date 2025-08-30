import { useMutation, useQuery } from '@apollo/client';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { TabContext } from '@mui/lab';
import { Box, Button, InputAdornment, List, ListItem, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { REMOVE_NOTICE_BY_ADMIN } from '../../../apollo/admin/mutation';
import { GET_ALL_NOTICE_BY_ADMIN } from '../../../apollo/admin/query';
import { NoticeList } from '../../../libs/components/admin/cs/NoticeList';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { NoticeCategory, NoticeStatus } from '../../../libs/enums/notice.enum';
import { sweetConfirmAlert, sweetErrorHandling } from '../../../libs/sweetAlert';
import { Notice } from '../../../libs/types/notice/notice';
import { NoticesInquiry } from '../../../libs/types/notice/notice.input';

const AdminNotice: NextPage = ({ initialInput,  ...props }: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [notices, setNotices] = useState<Notice[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [noticesInquiry, setNoticesInquiry] = useState<NoticesInquiry>(initialInput);
	const [value, setValue] = useState(
		noticesInquiry?.search?.noticeStatus ? noticesInquiry?.search?.noticeStatus : 'ALL',
	);
	const [searchType, setSearchType] = useState('ALL');
	const [searchText, setSearchText] = useState('');

	/** APOLLO REQUESTS **/
	const [removeNoticeByAdmin] = useMutation(REMOVE_NOTICE_BY_ADMIN);
	
	const {
		loading: getNoticesLoading,
		data: getNoticesData,
		error: getNoticesError,
		refetch: getNoticesRefetch,
	} = useQuery(GET_ALL_NOTICE_BY_ADMIN, {
		fetchPolicy: "network-only",
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data) => {
			setNotices(data?.getAllNoticesByAdmin?.list);
			setTotal(data?.getAllNoticesByAdmin?.metaCounter[0]?.total ?? 0);
		},
	});
	/** LIFECYCLES **/

	useEffect(() => {
		getNoticesRefetch();
	}, [initialInput]);

	/** HANDLERS **/

	const changePageHandler = async (event: unknown, newPage: number) => {
		const newInput = { ...noticesInquiry, page: newPage + 1 };
		setNoticesInquiry(newInput);
		await getNoticesRefetch({ input: newInput });
	};

	const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const newLimit = parseInt(event.target.value, 10);
		const newInput = { ...noticesInquiry, limit: newLimit, page: 1 };
		setNoticesInquiry(newInput);
		await getNoticesRefetch({ input: newInput });
	};

	const handleMenuIconClick = (e: any, index: number) => {
		const tempAnchor = anchorEl.slice();
		tempAnchor[index] = e.currentTarget;
		setAnchorEl(tempAnchor);
	};

	const handleMenuIconClose = () => {
		setAnchorEl([]);
	};

	const handleTabChange = async (event: any, newValue: string) => {
		setValue(newValue);
		setSearchText('');

		let updatedSearch = { ...noticesInquiry.search };
		if (newValue === 'ALL') {
			delete updatedSearch.noticeStatus;
		} else {
			updatedSearch.noticeStatus = newValue as NoticeStatus;
		}

		const newInput = {
			...noticesInquiry,
			page: 1,
			sort: 'createdAt',
			search: updatedSearch,
		};

		setNoticesInquiry(newInput);
		await getNoticesRefetch({ input: newInput });
	};

	const textHandler = useCallback((value: string) => {
		try {
			setSearchText(value);
		} catch (err: any) {
			console.log('textHandler: ', err.message);
		}
	}, []);

	const searchTextHandler = async () => {
		const newInput = {
			...noticesInquiry,
			page: 1,
			search: {
				...noticesInquiry.search,
				text: searchText,
			},
		};
		setSearchText('');
		setNoticesInquiry(newInput);
		await getNoticesRefetch({ input: newInput });
	};

	const searchTypeHandler = async (newValue: string) => {
		try {
			setSearchType(newValue);

			let updatedSearch = { ...noticesInquiry.search };
			if (newValue === 'ALL') {
				delete updatedSearch.noticeCategory;
			} else {
				updatedSearch.noticeCategory = newValue as NoticeCategory;
			}

			const newInput = {
				...noticesInquiry,
				page: 1,
				sort: 'createdAt',
				search: updatedSearch,
			};

			setNoticesInquiry(newInput);
			await getNoticesRefetch({ input: newInput });
		} catch (err: any) {
			console.log('searchTypeHandler: ', err.message);
		}
	};

	const removeNoticeHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('are you sure to remove?')) {
				await removeNoticeByAdmin({
					variables: {
						input: id
					},
				});
				getNoticesRefetch();
			}
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	return (
		// @ts-ignore
		<Box component={'div'} className={'content'}>
			<Box component={'div'} className={'title flex_space'}>
				<Typography variant={'h2'}>Notice Management</Typography>
				<Button
					className="btn_add"
					variant={'contained'}
					size={'medium'}
					onClick={() => router.push(`/admin/cs/notice_create`)}
				>
					<AddRoundedIcon sx={{ mr: '8px' }} />
					ADD
				</Button>
			</Box>
			<Box component={'div'} className={'table-wrap'}>
				<Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={'value'}>
						<Box component={'div'}>
							<List className={'tab-menu'}>
								<ListItem
									onClick={(e) => handleTabChange(e, 'ALL')}
									value="ALL"
									className={value === 'ALL' ? 'li on' : 'li'}
								>
									All 
								</ListItem>
								<ListItem
									onClick={(e) => handleTabChange(e, 'ACTIVE')}
									value="ACTIVE"
									className={value === 'ACTIVE' ? 'li on' : 'li'}
								>
									Active 
								</ListItem>
								<ListItem
									onClick={(e) => handleTabChange(e, 'HOLD')}
									value="HOLD"
									className={value === 'HOLD' ? 'li on' : 'li'}
								>
									HOLD 
								</ListItem>
								<ListItem
									onClick={(e) => handleTabChange(e, 'DELETE')}
									value="DELETE"
									className={value === 'DELETE' ? 'li on' : 'li'}
								>
									Delete
								</ListItem>
							</List>
							<Divider />
							<Stack className={'search-area'} sx={{ m: '24px' }}>
								<Select sx={{ width: '160px', mr: '20px' }} value={searchType}>
									<MenuItem value={'ALL'} onClick={() => searchTypeHandler('ALL')}>
										All
									</MenuItem>
									<MenuItem value={'FAQ'} onClick={() => searchTypeHandler('FAQ')}>
										FAQ
									</MenuItem>
									<MenuItem value={'TERMS'} onClick={() => searchTypeHandler('TERMS')}>
										Terms
									</MenuItem>
									<MenuItem value={'INQUIRY'} onClick={() => searchTypeHandler('INQUIRY')}>
										Inquiry
									</MenuItem>
								</Select>

								<OutlinedInput
									value={searchText}
									onChange={(e) => textHandler(e.target.value)}
									sx={{ width: '100%' }}
									className={'search'}
									placeholder="Search user name"
									onKeyDown={(event) => {
										if (event.key == 'Enter') searchTextHandler().then();
									}}
									endAdornment={
										<>
											{searchText && (
												<CancelRoundedIcon
													style={{ cursor: 'pointer' }}
													onClick={async () => {
														const newInput = {
															...noticesInquiry,
															page: 1,
															search: {
																...noticesInquiry.search,
																text: '',
															},
														};

														setSearchText('');
														setNoticesInquiry(newInput);
														await getNoticesRefetch({ input: newInput });
													}}
												/>
											)}
											<InputAdornment position="end" onClick={() => searchTextHandler()}>
												<img src="/img/icons/search_icon.png" alt={'searchIcon'} />
											</InputAdornment>
										</>
									}
								/>
							</Stack>
							<Divider />
						</Box>
						<NoticeList
							// dense={dense}
							// membersData={membersData}
							// searchMembers={searchMembers}
							anchorEl={anchorEl}
							notices={notices}
							handleMenuIconClick={handleMenuIconClick}
							handleMenuIconClose={handleMenuIconClose}
							removeNoticeHandler={removeNoticeHandler}
							// generateMentorTypeHandle={generateMentorTypeHandle}
						/>

						<TablePagination
							rowsPerPageOptions={[20, 40, 60]}
							component="div"
							count={total}
							rowsPerPage={noticesInquiry?.limit}
							page={noticesInquiry?.page - 1}
							onPageChange={changePageHandler}
							onRowsPerPageChange={changeRowsPerPageHandler}
						/>
					</TabContext>
				</Box>
			</Box>
		</Box>
	);
};

AdminNotice.defaultProps  = {
	initialInput: {
		page: 1,
		limit: 9,
		sort: 'createdAt',
		direction: 'DESC',
		search: {
			
		},
	},
}

export default withAdminLayout(AdminNotice);
