import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
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
	deleteOrderHandler?: any;
	memberPage?: boolean;
	updateOrderHandler?: any;
}

export const OrderCard = (props: OrderCardProps) => {
	const { order, deleteOrderHandler, memberPage, updateOrderHandler} = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

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
				<Stack className="image-box" onClick={() => pushOrderDetail(order?._id)}>
					<img src={'/img/banner/header1.svg'} alt="" />
                    {/* /** `${process.env.REACT_APP_API_URL}/${order.modelData?.modelImages[0]}` */ }
				</Stack>
				<Stack className="information-box" onClick={() => pushOrderDetail(order?._id)}>
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
					<Typography className="email">
                        {order?.agentData?.memberEmail ?? 'N/A'}
                    </Typography>
				</Stack>
				{!memberPage && order.orderStatus === OrderStatus.PENDING && (
					<Stack className="action-box">
						<IconButton className="icon-button" onClick={() => pushEditOrder(order._id)}>
							<ModeIcon className="buttons" />
						</IconButton>
						<IconButton className="icon-button" onClick={() => {
										handleClose();
										updateOrderHandler(OrderStatus.CANCELLED, order?._id);
									}}>
							<DeleteIcon className="buttons" />
						</IconButton>
					</Stack>
				)}
			</Stack>
		);
};
