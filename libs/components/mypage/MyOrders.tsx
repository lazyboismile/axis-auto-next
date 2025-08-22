import { useReactiveVar } from '@apollo/client';
import { Pagination, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { userVar } from '../../../apollo/store';
import { OrderStatus } from '../../enums/order.enum';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { T } from '../../types/common';
import { Order } from '../../types/order/order';
import { OrderInquiry } from '../../types/order/order.input';
import { OrderCard } from './OrderCard';

const MyOrders: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const [searchFilter, setSearchFilter] = useState<OrderInquiry>(initialInput);
	const [memberOrders, setMemberOrders] = useState<Order[]>(
		initialInput.length ? initialInput : [1, 2, 3, 4, 5, 6, 7]
	);
	const [total, setTotal] = useState<number>(0);
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** APOLLO REQUESTS **/

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	const changeStatusHandler = (value: OrderStatus) => {
		setSearchFilter({ ...searchFilter,   search: { orderStatus: value  }});
	};

	const deleteOrderHandler = async (id: string) => {};

	const updateOrderHandler = async (status: string, id: string) => {};

	// if (user?.memberType !== 'AGENT') {
	// 	router.back();
	// }

	const tabs = [
		{ label: "Pending", value: OrderStatus.PENDING },
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
							<Typography className="title-text">Agent Email</Typography>
							<Typography className="title-text">Action</Typography>
						</Stack>

						{memberOrders?.length === 0 ? (
							<div className={'no-data'}>
								<img src="/img/icons/icoAlert.svg" alt="" />
								<p>No Order found!</p>
							</div>
						) : (
							memberOrders.map((order: Order) => {
								return (
									<OrderCard
										order={order}
										deleteOrderHandler={deleteOrderHandler}
										updateOrderHandler={updateOrderHandler}
									/>
								);
							})
						)}

						{memberOrders.length !== 0 && (
							<Stack className="pagination-config">
								<Stack className="pagination-box">
									<Pagination
										count={Math.ceil(total / searchFilter.limit)}
										page={searchFilter.page}
										shape="circular"
										color="primary"
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
			OrderStatus: 'PENDING',
		},
	},
};

export default MyOrders;
