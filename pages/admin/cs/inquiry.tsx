import { useQuery } from '@apollo/client';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { TabContext } from '@mui/lab';
import { Box, InputAdornment, List, ListItem, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
import { GET_FAQS_BY_ADMIN } from '../../../apollo/admin/query';
import { InquiryList } from '../../../libs/components/admin/cs/InquiryList';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { FaqCategory, FaqStatus } from '../../../libs/enums/faq.enum';
import { Faq } from '../../../libs/types/faq/faq';
import { FaqsInquiry } from '../../../libs/types/faq/faq.input';

const InquiryArticles: NextPage = ({ initialInput,  ...props }: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [faqs, setFaqs] = useState<Faq[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [faqsInquiry, setFaqsInquiry] = useState<FaqsInquiry>(initialInput);
	const [value, setValue] = useState(
		faqsInquiry?.search?.faqStatus ? faqsInquiry?.search?.faqStatus : 'ALL',
	);
	const [searchType, setSearchType] = useState('ALL');
	const [searchText, setSearchText] = useState('');

	/** APOLLO REQUESTS **/
	const {
		loading: getFaqsLoading,
		data: getFaqsData,
		error: getFaqsError,
		refetch: getFaqsRefetch,
	} = useQuery(GET_FAQS_BY_ADMIN, {
		fetchPolicy: "network-only",
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data) => {
			setFaqs(data?.getFaqsByAdmin?.list);
			setTotal(data?.getFaqsByAdmin?.metaCounter[0]?.total ?? 0);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		getFaqsRefetch();
	}, [initialInput]);

	
	/** HANDLERS **/

	const changePageHandler = async (event: unknown, newPage: number) => {
		const newInput = { ...faqsInquiry, page: newPage + 1 };
		setFaqsInquiry(newInput);
		await getFaqsRefetch({ input: newInput });
	};

	const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const newLimit = parseInt(event.target.value, 10);
		const newInput = { ...faqsInquiry, limit: newLimit, page: 1 };
		setFaqsInquiry(newInput);
		await getFaqsRefetch({ input: newInput });
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

		let updatedSearch = { ...faqsInquiry.search };
		if (newValue === 'ALL') {
			delete updatedSearch.faqStatus;
		} else {
			updatedSearch.faqStatus = newValue as FaqStatus;
		}

		const newInput = {
			...faqsInquiry,
			page: 1,
			sort: 'createdAt',
			search: updatedSearch,
		};

		setFaqsInquiry(newInput);
		await getFaqsRefetch({ input: newInput });
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
			...faqsInquiry,
			page: 1,
			search: {
				...faqsInquiry.search,
				text: searchText,
			},
		};
		setSearchText('');
		setFaqsInquiry(newInput);
		await getFaqsRefetch({ input: newInput });
	};

	const searchTypeHandler = async (newValue: string) => {
		try {
			setSearchType(newValue);

			let updatedSearch = { ...faqsInquiry.search };
			if (newValue === 'ALL') {
				delete updatedSearch.faqCategory;
			} else {
				updatedSearch.faqCategory = newValue as FaqCategory;
			}

			const newInput = {
				...faqsInquiry,
				page: 1,
				sort: 'createdAt',
				search: updatedSearch,
			};

			setFaqsInquiry(newInput);
			await getFaqsRefetch({ input: newInput });
		} catch (err: any) {
			console.log('searchTypeHandler: ', err.message);
		}
	};


	return (
		<Box component={'div'} className={'content'}>
			<Typography variant={'h2'} className={'tit'} sx={{ mb: '24px' }}>
				Admin Answers Panel
			</Typography>
			<Box component={'div'} className={'table-wrap'}>
				<Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={value}>
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
									onClick={(e) => handleTabChange(e, 'BLOCKED')}
									value="BLOCKED"
									className={value === 'BLOCKED' ? 'li on' : 'li'}
								>
									Blocked 
								</ListItem>
								<ListItem
									onClick={(e) => handleTabChange(e, 'DELETE')}
									value="DELETE"
									className={value === 'DELETE' ? 'li on' : 'li'}
								>
									DELETE
								</ListItem>
							</List>
							<Divider />
							<Stack className={'search-area'} sx={{ m: '24px' }}>
								<Select sx={{ width: '160px', mr: '20px' }} value={searchType}>
									<MenuItem value={'ALL'} onClick={() => searchTypeHandler('ALL')}>
										All
									</MenuItem>
									<MenuItem value={'AGENTS'} onClick={() => searchTypeHandler('AGENTS')}>
										Agents
									</MenuItem>
									<MenuItem value={'COMMUNITY'} onClick={() => searchTypeHandler('COMMUNITY')}>Community</MenuItem>
									<MenuItem value={'MEMBERSHIP'} onClick={() => searchTypeHandler('MEMBERSHIP')}>Membership</MenuItem>
									<MenuItem value={'MODEL'} onClick={() => searchTypeHandler('MODEL')}>Model</MenuItem>
									<MenuItem value={'PAYMENT'} onClick={() => searchTypeHandler('PAYMENT')}>Payment</MenuItem>
									<MenuItem value={'OTHER'} onClick={() => searchTypeHandler('OTHER')}>Other</MenuItem>
								</Select>

								<OutlinedInput
									value={searchText}
									onChange={(e) => textHandler(e.target.value)}
									sx={{ width: '100%' }}
									className={'search'}
									placeholder="Search content & subject"
									onKeyDown={(event) => {
										if (event.key == 'Enter') searchTextHandler();
									}}
									endAdornment={
										<>
											{searchText && (
												<CancelRoundedIcon
													style={{ cursor: 'pointer' }}
													onClick={async () => {
														const newInput = {
															...faqsInquiry,
															page: 1,
															search: {
																...faqsInquiry.search,
																text: '',
															},
														};

														setSearchText('');
														setFaqsInquiry(newInput);
														await getFaqsRefetch({ input: newInput });
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
						<InquiryList
							// dense={dense}
							// membersData={membersData}
							// searchMembers={searchMembers}
							anchorEl={anchorEl}
							faqs={faqs}
							handleMenuIconClick={handleMenuIconClick}
							handleMenuIconClose={handleMenuIconClose}
							// generateFaqTypeHandle={generateFaqTypeHandle}
						/>

						<TablePagination
							rowsPerPageOptions={[20, 40, 60]}
							component="div"
							count={total}
							rowsPerPage={faqsInquiry?.limit}
							page={faqsInquiry?.page - 1}
							onPageChange={changePageHandler}
							onRowsPerPageChange={changeRowsPerPageHandler}
						/>
					</TabContext>
				</Box>
			</Box>
		</Box>
	);
};

InquiryArticles.defaultProps  = {
	initialInput: {
		page: 1,
		limit: 9,
		sort: 'createdAt',
		direction: 'DESC',
		search: {
			
		},
	},
}

export default withAdminLayout(InquiryArticles);
