import { useMutation, useQuery } from '@apollo/client';
import { TabContext } from '@mui/lab';
import { Box, List, ListItem } from '@mui/material';
import Divider from '@mui/material/Divider';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { REMOVE_ORDER_BY_ADMIN, UPDATE_ORDER_BY_ADMIN } from '../../../apollo/admin/mutation';
import { GET_ALL_ORDERS_BY_ADMIN } from '../../../apollo/admin/query';
import { OrderPanelList } from '../../../libs/components/admin/orders/OrderList';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { OrderStatus } from '../../../libs/enums/order.enum';
import { sweetConfirmAlert, sweetErrorHandling } from '../../../libs/sweetAlert';
import { T } from '../../../libs/types/common';
import { Order } from '../../../libs/types/order/order';
import { OrderInquiry } from '../../../libs/types/order/order.input';
import { OrderUpdate } from '../../../libs/types/order/order.update';

const AdminOrders: NextPage = ({ initialInquiry, ...props }: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [ordersInquiry, setOrdersInquiry] = useState<OrderInquiry>(initialInquiry);
	const [orders, setOrders] = useState<Order[]>([]);
	const [ordersTotal, setOrdersTotal] = useState<number>(0);
	const [value, setValue] = useState(
		ordersInquiry?.search?.orderStatus ? ordersInquiry?.search?.orderStatus : 'ALL',
	);
	const [searchType, setSearchType] = useState('ALL');

	/** APOLLO REQUESTS **/
	const [updateOrderByAdmin] = useMutation(UPDATE_ORDER_BY_ADMIN);
	const [removeOrderByAdmin] = useMutation(REMOVE_ORDER_BY_ADMIN);

	const {
		loading: getAllOrdersByAdminLoading,
		data: getAllOrdersByAdminData,
		error: getAllOrdersByAdminError,
		refetch: getAllOrdersByAdminRefetch,
	} = useQuery(GET_ALL_ORDERS_BY_ADMIN, {
		fetchPolicy: "network-only",
		variables: { input: ordersInquiry },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setOrders(data?.getAllOrdersByAdmin?.list);
			setOrdersTotal(data?.getAllOrdersByAdmin?.metaCounter[0]?.total)
		}
	});

	/** LIFECYCLES **/
	useEffect(() => {
		getAllOrdersByAdminRefetch();
	}, [ordersInquiry]);

	/** HANDLERS **/
	const changePageHandler = async (event: unknown, newPage: number) => {
		ordersInquiry.page = newPage + 1;
		getAllOrdersByAdminRefetch();
		setOrdersInquiry({ ...ordersInquiry });
	};

	const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		ordersInquiry.limit = parseInt(event.target.value, 10);
		ordersInquiry.page = 1;
		getAllOrdersByAdminRefetch();
		setOrdersInquiry({ ...ordersInquiry });
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

		setOrdersInquiry({ ...ordersInquiry, page: 1});

		switch (newValue) {
			case 'ALL':
				setOrdersInquiry({ ...ordersInquiry, page: 1, search: {} });
				break;
            case 'PENDING':
				setOrdersInquiry({ ...ordersInquiry, search: { orderStatus: OrderStatus.PENDING } });
				break;
			case 'PAID':
				setOrdersInquiry({ ...ordersInquiry, search: { orderStatus: OrderStatus.PAID } });
				break;
			case 'PROCESSING':
				setOrdersInquiry({ ...ordersInquiry, search: { orderStatus: OrderStatus.PROCESSING } });
				break;
			case 'COMPLETED':
				setOrdersInquiry({ ...ordersInquiry, search: { orderStatus: OrderStatus.COMPLETED } });
				break;
			case 'CANCELLED':
				setOrdersInquiry({ ...ordersInquiry, search: { orderStatus: OrderStatus.CANCELLED } });
				break;
		}
	};

	const searchTypeHandler = async (newValue: string) => {
		try {
			setSearchType(newValue);

			if (newValue !== 'ALL') {
				setOrdersInquiry({
					...ordersInquiry,
					page: 1,
					search: {
						...ordersInquiry.search,
						orderStatus: newValue as OrderStatus,
					},
				});
			} else {
				setOrdersInquiry({ ...ordersInquiry, page: 1, search: {} });
			}

		} catch (err: any) {
			console.log('searchTypeHandler: ', err.message);
		}
	};

	const removeOrderHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('are you sure to remove?')) {
				await removeOrderByAdmin({
					variables: {
						input: id
					},
				});
				getAllOrdersByAdminRefetch();
			}
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const updateOrderHandler = async (updateData: OrderUpdate) => {
		try {
			console.log('+updateData: ', updateData);
			await updateOrderByAdmin({
				variables: {
					input: updateData,
				},
			});

			getAllOrdersByAdminRefetch();
			menuIconCloseHandler();
		} catch (err: any) {
			menuIconCloseHandler();
			sweetErrorHandling(err).then();
		}
	};

	return (
		<Box component={'div'} className={'content'}>
			<Typography variant={'h2'} className={'tit'} sx={{ mb: '24px' }}>
				Order List
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
									onClick={(e) => tabChangeHandler(e, 'PAID')}
									value="PAID"
									className={value === 'PAID' ? 'li on' : 'li'}
								>
									Paid
								</ListItem>
								<ListItem
									onClick={(e) => tabChangeHandler(e, 'PROCESSING')}
									value="PROCESSING"
									className={value === 'PROCESSING' ? 'li on' : 'li'}
								>
									Processing
								</ListItem>
								<ListItem
									onClick={(e) => tabChangeHandler(e, 'COMPLETED')}
									value="COMPLETED"
									className={value === 'COMPLETED' ? 'li on' : 'li'}
								>
									Completed
								</ListItem>
								<ListItem
									onClick={(e) => tabChangeHandler(e, 'CANCELLED')}
									value="CANCELLED"
									className={value === 'CANCELLED' ? 'li on' : 'li'}
								>
									Cancelled
								</ListItem>
							</List>
							<Divider />
						</Box>
						<OrderPanelList
							orders={orders}
							anchorEl={anchorEl}
							menuIconClickHandler={menuIconClickHandler}
							menuIconCloseHandler={menuIconCloseHandler}
							updateOrderHandler={updateOrderHandler}
							removeOrderHandler={removeOrderHandler}
						/>

						<TablePagination
							rowsPerPageOptions={[10, 20, 40, 60]}
							component="div"
							count={ordersTotal}
							rowsPerPage={ordersInquiry?.limit}
							page={ordersInquiry?.page - 1}
							onPageChange={changePageHandler}
							onRowsPerPageChange={changeRowsPerPageHandler}
						/>
					</TabContext>
				</Box>
			</Box>
		</Box>
	);
};

AdminOrders.defaultProps = {
	initialInquiry: {
		page: 1,
		limit: 10,
		search: {},
	},
};

export default withAdminLayout(AdminOrders);
