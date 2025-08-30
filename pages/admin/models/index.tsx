import { useMutation, useQuery } from '@apollo/client';
import { TabContext } from '@mui/lab';
import { Box, List, ListItem, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { REMOVE_MODEL_BY_ADMIN, UPDATE_MODEL_BY_ADMIN } from '../../../apollo/admin/mutation';
import { GET_ALL_MODELS_BY_ADMIN } from '../../../apollo/admin/query';
import { ModelPanelList } from '../../../libs/components/admin/models/ModelList';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { ModelLocation, ModelStatus } from '../../../libs/enums/model.enum';
import { sweetConfirmAlert, sweetErrorHandling } from '../../../libs/sweetAlert';
import { T } from '../../../libs/types/common';
import { Model } from '../../../libs/types/model/model';
import { AllModelsInquiry } from '../../../libs/types/model/model.input';
import { ModelUpdate } from '../../../libs/types/model/model.update';

const AdminModels: NextPage = ({ initialInquiry, ...props }: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [modelsInquiry, setModelsInquiry] = useState<AllModelsInquiry>(initialInquiry);
	const [models, setModels] = useState<Model[]>([]);
	const [modelsTotal, setModelsTotal] = useState<number>(0);
	const [value, setValue] = useState(
		modelsInquiry?.search?.modelStatus ? modelsInquiry?.search?.modelStatus : 'ALL',
	);
	const [searchType, setSearchType] = useState('ALL');

	/** APOLLO REQUESTS **/

	const [updateModel] = useMutation(UPDATE_MODEL_BY_ADMIN);
	const [removeModel] = useMutation(REMOVE_MODEL_BY_ADMIN);

	const {
		loading: getAllModelsByAdminLoading,
		data: getAllModelsByAdminData,
		error: getAllModelsByAdminError,
		refetch: getAllModelsByAdminRefetch,
	} = useQuery(GET_ALL_MODELS_BY_ADMIN, {
		fetchPolicy: "network-only",
		variables: { input: modelsInquiry },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setModels(data?.getAllModelsByAdmin?.list);
			setModelsTotal(data?.getAllModelsByAdmin?.metaCounter[0]?.total)
		}
	});

	/** LIFECYCLES **/
	useEffect(() => {
		getAllModelsByAdminRefetch();
	}, [modelsInquiry]);

	/** HANDLERS **/
	const changePageHandler = async (event: unknown, newPage: number) => {
		modelsInquiry.page = newPage + 1;
		await getAllModelsByAdminRefetch({ input: modelsInquiry });
		setModelsInquiry({ ...modelsInquiry });
	};

	const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		modelsInquiry.limit = parseInt(event.target.value, 10);
		modelsInquiry.page = 1;
		await getAllModelsByAdminRefetch({ input: modelsInquiry });
		setModelsInquiry({ ...modelsInquiry });
	};

	const menuIconClickHandler = (e: any, index: number) => {
		const tempAnchor = anchorEl.slice();
		tempAnchor[index] = e.currentTarget;
		setAnchorEl(tempAnchor);
	};

	const menuIconCloseHandler = () => {
		setAnchorEl([]);
	};

	const tabChangeHandler = async (event: any, newValue: string) => {
		setValue(newValue);

		setModelsInquiry({ ...modelsInquiry, page: 1, sort: 'createdAt' });

		switch (newValue) {
            case 'PENDING':
				setModelsInquiry({ ...modelsInquiry, search: { modelStatus: ModelStatus.PENDING } });
				break;
			case 'LIVE':
				setModelsInquiry({ ...modelsInquiry, search: { modelStatus: ModelStatus.LIVE } });
				break;
			case 'SOLD':
				setModelsInquiry({ ...modelsInquiry, search: { modelStatus: ModelStatus.SOLD } });
				break;
			case 'DELETE':
				setModelsInquiry({ ...modelsInquiry, search: { modelStatus: ModelStatus.DELETE } });
				break;
			default:
				delete modelsInquiry?.search?.modelStatus;
				setModelsInquiry({ ...modelsInquiry });
				break;
		}
	};

	const removeModelHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure to remove?')) {
				await removeModel({
					variables: {
						input: id ,
					},
				});
				await getAllModelsByAdminRefetch({ input: modelsInquiry });
			}
			menuIconCloseHandler();
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const searchTypeHandler = async (newValue: string) => {
		try {
			setSearchType(newValue);

			if (newValue !== 'ALL') {
				setModelsInquiry({
					...modelsInquiry,
					page: 1,
					sort: 'createdAt',
					search: {
						...modelsInquiry.search,
						modelLocationList: [newValue as ModelLocation],
					},
				});
				await getAllModelsByAdminRefetch({ input: modelsInquiry });
			} else {
				delete modelsInquiry?.search?.modelLocationList;
				setModelsInquiry({ ...modelsInquiry });
			}
		} catch (err: any) {
			console.log('searchTypeHandler: ', err.message);
		}
	};

	const updateModelHandler = async (updateData: ModelUpdate) => {
		try {
			console.log('+updateData: ', updateData);
			await updateModel({
				variables: {
					input: updateData,
				},
			});
			menuIconCloseHandler();
			await getAllModelsByAdminRefetch({ input: modelsInquiry });
		} catch (err: any) {
			menuIconCloseHandler();
			sweetErrorHandling(err).then();
		}
	};

	return (
		<Box component={'div'} className={'content'}>
			<Typography variant={'h2'} className={'tit'} sx={{ mb: '24px' }}>
				Model List
			</Typography>
			<Box component={'div'} className={'table-wrap'}>
				<Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={value}>
						<Box component={'div'}>
							<List className={'tab-menu'}>
								<ListItem
									onClick={(e) => tabChangeHandler(e, 'ALL')}
									value="ALL"
									className={value === 'ALL' ? 'li on' : 'li'}
								>
									All
								</ListItem>
                                <ListItem
									onClick={(e) => tabChangeHandler(e, 'PENDING')}
									value="PENDING"
									className={value === 'PENDING' ? 'li on' : 'li'}
								>
									Pending
								</ListItem>
								<ListItem
									onClick={(e) => tabChangeHandler(e, 'LIVE')}
									value="LIVE"
									className={value === 'LIVE' ? 'li on' : 'li'}
								>
									Live
								</ListItem>
								<ListItem
									onClick={(e) => tabChangeHandler(e, 'SOLD')}
									value="SOLD"
									className={value === 'SOLD' ? 'li on' : 'li'}
								>
									Sold
								</ListItem>
								<ListItem
									onClick={(e) => tabChangeHandler(e, 'DELETE')}
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
										ALL
									</MenuItem>
									{Object.values(ModelLocation).map((location) => (
										<MenuItem
											key={location}
											value={location as ModelLocation}
											onClick={() => searchTypeHandler(location as ModelLocation)} 
										>
											{location}
										</MenuItem>
									))}

								</Select>
							</Stack>
							<Divider />
						</Box>
						<ModelPanelList
							models={models}
							anchorEl={anchorEl}
							menuIconClickHandler={menuIconClickHandler}
							menuIconCloseHandler={menuIconCloseHandler}
							updateModelHandler={updateModelHandler}
							removeModelHandler={removeModelHandler}
						/>

						<TablePagination
							rowsPerPageOptions={[10, 20, 40, 60]}
							component="div"
							count={modelsTotal}
							rowsPerPage={modelsInquiry?.limit}
							page={modelsInquiry?.page - 1}
							onPageChange={changePageHandler}
							onRowsPerPageChange={changeRowsPerPageHandler}
						/>
					</TabContext>
				</Box>
			</Box>
		</Box>
	);
};

AdminModels.defaultProps = {
	initialInquiry: {
		page: 1,
		limit: 10,
		sort: 'createdAt',
		direction: 'DESC',
		search: {},
	},
};

export default withAdminLayout(AdminModels);
