import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { Pagination, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { userVar } from '../../../apollo/store';
import { UPDATE_ORDER } from '../../../apollo/user/mutation';
import { GET_MY_AGENT_ORDERS, GET_MY_ORDERS } from '../../../apollo/user/query';
import { OrderStatus } from '../../enums/order.enum';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { sweetConfirmAlert, sweetErrorHandling } from '../../sweetAlert';
import { T } from '../../types/common';
import { Order } from '../../types/order/order';
import { OrderInquiry } from '../../types/order/order.input';
import { OrderCard } from './OrderCard';

const MyOrders: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const [searchFilter, setSearchFilter] = useState<OrderInquiry>(initialInput);
	const [memberOrders, setMemberOrders] = useState<Order[]>([]);
	const [total, setTotal] = useState<number>(0);
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** APOLLO REQUESTS **/
	const [updateOrder] = useMutation(UPDATE_ORDER);
	const ORDERS_QUERY = user?.memberType === 'AGENT' ? GET_MY_AGENT_ORDERS : GET_MY_ORDERS;

	const {
		loading: getMemberOrdersLoading,
		data: getMemberOrdersData,
		error: getMemberOrdersError,
		refetch: getMemberOrdersRefetch,
	} = useQuery(ORDERS_QUERY, {
		fetchPolicy: "network-only",
		variables: { input: searchFilter },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			const key = user?.memberType === 'AGENT' ? 'getAgentOrders' : 'getMyOrders';
			setMemberOrders(data?.[key]?.list ?? []);
			setTotal(data?.[key]?.metaCounter?.[0]?.total ?? 0);
		}
	});

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	const changeStatusHandler = (value: OrderStatus) => {
		setSearchFilter({ ...searchFilter,   search: { orderStatus: value  }});
	};

	const cancelOrderHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure you want to cancel this order?')) {
				await updateOrder({ variables: { input: { _id: id, orderStatus: 'CANCELLED' } } });
				await getMemberOrdersRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	const updateOrderHandler = async (status: string, id: string) => {
		try {
			if (await sweetConfirmAlert(`Are you sure you want to update the ${status}?`)) {
				await updateOrder({ variables: { input: { _id: id, orderStatus: status } } });
				await getMemberOrdersRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	// if (user?.memberType !== 'AGENT') {
	// 	router.back();
	// }

	const tabs = [
		{ label: "PENDING", value: OrderStatus.PENDING },
		{ label: "PAID", value: OrderStatus.PAID },
		{ label: "PROCESSING", value: OrderStatus.PROCESSING },
		{ label: "COMPLETED", value: OrderStatus.COMPLETED },
		{ label: "CANCELLED", value: OrderStatus.CANCELLED },
	]

	if (device === 'mobile') {
		return <div>AxisAuto ORDERS MOBILE</div>;
	} else {
		return (
			<div id="my-order-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">My ORDERS</Typography>
						<Typography className="sub-title">We are glad to see you again!</Typography>
					</Stack>
				</Stack>
				<Stack className="order-list-box">
					<Stack className="tab-name-box">
						{tabs.map(tab => (
							<Typography
							key={tab.value}
							onClick={() => changeStatusHandler(tab.value)}
							className={searchFilter.search.orderStatus === tab.value ? "active-tab-name" : "tab-name"}
							>
							{tab.label}
							</Typography>
						))}
					</Stack>
					<Stack className="list-box">
						<Stack className="listing-title-box">
							<Typography className="title-text">Listing Id</Typography>
							<Typography className="title-text">Date Published</Typography>
							<Typography className="title-text">Status</Typography>
							<Typography className="title-text">
								{user?.memberType === 'AGENT' ? 'USER' : 'AGENT'} Email
							</Typography>
							<Typography className="title-text">Action</Typography>
						</Stack>

						<Stack className="list-box">
						{memberOrders?.length ? (
							memberOrders.map((order: Order) => (
							<OrderCard
								key={order._id}
								memberPage={user?.memberType !== 'AGENT'}
								userType={user?.memberType === 'AGENT' ? 'AGENT' : user?.memberType === 'USER' ? 'USER' : undefined}
								order={order}
								cancelOrderHandler={cancelOrderHandler}
								updateOrderHandler={updateOrderHandler}
							/>
							))
						) : (
							<div className="no-data">
							<img src="/img/icons/icoAlert.svg" alt="No Orders" />
							<p>No orders found!</p>
							</div>
						)}
						</Stack>
						{memberOrders.length !== 0 && (
							<Stack className="pagination-config">
								<Stack className="pagination-box">
									<Pagination
										count={Math.ceil(total / searchFilter.limit)}
										page={searchFilter.page}
										shape="circular"
										sx={{
											'& .MuiPaginationItem-root': {
											color: '#405FF2', // text color for numbers
											},
											'& .MuiPaginationItem-root.Mui-selected': {
											backgroundColor: '#405FF2', // selected button background
											color: '#fff',              // selected button text
											},
											'& .MuiPaginationItem-root.Mui-selected:hover': {
											backgroundColor: '#3249c7', // darker on hover
											},
										}}
										onChange={paginationHandler}
									/>
								</Stack>
								<Stack className="total-result">
									<Typography>{total} orders available</Typography>
								</Stack>
							</Stack>
						)}
					</Stack>
				</Stack>
			</div>
		);
	}
};

MyOrders.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		search: {
			orderStatus: 'PENDING',
		},
	},
};

export default MyOrders;
