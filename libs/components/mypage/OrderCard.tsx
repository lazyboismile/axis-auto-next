import DeleteIcon from '@mui/icons-material/Delete';
import { Menu, MenuItem, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Moment from 'react-moment';
import { OrderStatus } from '../../enums/order.enum';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Order } from '../../types/order/order';
import { formatterStr } from '../../utils';

interface OrderCardProps {
	order: Order;
	cancelOrderHandler?: any;
	memberPage?: boolean;
	updateOrderHandler?: any;
	userType?: 'AGENT' | 'USER';
}

export const OrderCard = (props: OrderCardProps) => {
	const { order, cancelOrderHandler, memberPage, updateOrderHandler, userType} = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const isAgent = userType === 'AGENT';
	const email = isAgent 
	? order?.buyerData?.memberEmail 
	: order?.agentData?.memberEmail;


	/** HANDLERS **/
	const pushEditOrder = async (id: string) => {
		console.log('+pushEditOrder: ', id);
		await router.push({
			pathname: '/mypage',
			query: { category: 'addOrder', modelId: id },
		});
	};

	const pushOrderDetail = async (id: string) => {
		if (memberPage)
			await router.push({
				pathname: '/order/detail',
				query: { id: id },
			});
		else return;
	};

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	if (device === 'mobile') {
		return <div>MOBILE ORDER CARD</div>;
	} else
		return (
			<Stack className="order-card-box">
				<Stack className="image-box">
					 {/* onClick={() => pushOrderDetail(order?._id)} */}
					<img
						src={
							order.modelData?.modelImages?.[0]
							? `${process.env.REACT_APP_API_URL}/${order.modelData.modelImages[0]}`
							: "/img/banner/header1.svg"
						}
						alt="model"
					/>
				</Stack>
				<Stack className="information-box" >
					{/* onClick={() => pushOrderDetail(order?._id)} */}
					<Typography className="name">{order.modelData?.modelTitle ?? 'N/A'}</Typography>
					<Typography className="address">{order.modelData?.modelAddress  ?? 'N/A'}</Typography>
					<Typography className="price">
						<strong>${formatterStr(order?.orderPrice)}</strong>
					</Typography>
				</Stack>
				<Stack className="date-box">
					<Typography className="date">
						<Moment format="DD MMMM, YYYY">{order.createdAt}</Moment>
					</Typography>
				</Stack>
				<Stack className="status-box">
					<Stack className="coloured-box" sx={{ background: '#E5F0FD' }} onClick={handleClick}>
						<Typography className="status" sx={{ color: '#3554d1' }}>
							{order.orderStatus}
						</Typography>
					</Stack>
				</Stack>
				{!memberPage && order.orderStatus !== 'COMPLETED' && (
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
								width: '70px',
								mt: 1,
								ml: '10px',
								overflow: 'visible',
								filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							},
							style: {
								padding: 0,
								display: 'flex',
								justifyContent: 'center',
							},
						}}
					>
						{order.orderStatus === 'PENDING' && (
							<>
								<MenuItem
									disableRipple
									onClick={() => {
										handleClose();
										updateOrderHandler(OrderStatus.COMPLETED, order?._id);
									}}
								>
									COMPLETED
								</MenuItem>
							</>
						)}
					</Menu>
				)}

				<Stack className="email-box">
				<Typography className="email">{email ?? 'N/A'}</Typography>
				</Stack>
				{!memberPage && 
					(order.orderStatus === OrderStatus.PENDING ||
					order.orderStatus === OrderStatus.PAID ||
					order.orderStatus === OrderStatus.PROCESSING) && (
						<Stack className="action-box">
						{order.orderStatus === OrderStatus.PENDING && (
							<>
								<MenuItem
									disableRipple
									onClick={() => {
										handleClose();
										updateOrderHandler(OrderStatus.PAID, order?._id);
									}}
								>
									PENDING
								</MenuItem>

								<IconButton
								className="icon-button"
								onClick={() => {
									handleClose();
									updateOrderHandler(OrderStatus.CANCELLED, order?._id);
								}}
								>
								<DeleteIcon className="buttons" />
								</IconButton>
							</>
						)}
						{order.orderStatus === OrderStatus.PAID && (
							<>
								<MenuItem
									disableRipple
									onClick={() => {
										handleClose();
										updateOrderHandler(OrderStatus.PROCESSING, order?._id);
									}}
								>
									PAID
								</MenuItem>

								<IconButton
								className="icon-button"
								onClick={() => {
									handleClose();
									updateOrderHandler(OrderStatus.CANCELLED, order?._id);
								}}
								>
								<DeleteIcon className="buttons" />
								</IconButton>
							</>
						)}
						{order.orderStatus === OrderStatus.PROCESSING && (
							<>
									<MenuItem
									disableRipple
									onClick={() => {
										handleClose();
										updateOrderHandler(OrderStatus.COMPLETED, order?._id);
									}}
								>
									PROCESSING
								</MenuItem>

								<IconButton
								className="icon-button"
								onClick={() => {
									handleClose();
									updateOrderHandler(OrderStatus.CANCELLED, order?._id);
								}}
								>
								<DeleteIcon className="buttons" />
								</IconButton>
							</>
						)}
					</Stack>
				)}
			</Stack>
		);
};
