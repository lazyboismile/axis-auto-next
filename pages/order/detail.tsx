import { useQuery, useReactiveVar } from '@apollo/client';
import { Box, CircularProgress, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { GET_ORDER_BY_ADMIN } from '../../apollo/admin/query';
import { userVar } from '../../apollo/store';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { REACT_APP_API_URL } from '../../libs/config';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { T } from '../../libs/types/common';
import { Order } from '../../libs/types/order/order';

SwiperCore.use([Autoplay, Navigation, Pagination]);

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const OrderDetail: NextPage = ({ initialComment, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [orderId, setOrderId] = useState<string | null>(null);
	const [order, setOrder] = useState<Order | null>(null);
	const [slideImage, setSlideImage] = useState<string>('');

    // if (user?.memberType !== 'ADMIN') {
	// 	router.back();
	// }

	/** APOLLO REQUESTS **/

	const {
		loading: getOrderByAdminLoading,
		data: getOrderByAdminData,
		error: getOrderByAdminError,
		refetch: getOrderByAdminRefetch,
	} = useQuery(GET_ORDER_BY_ADMIN, {
		fetchPolicy: "network-only",
		variables: { input: orderId },
		skip: !orderId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if(data?.getOrderByAdmin) setOrder(data?.getOrderByAdmin);
			if(data?.getOrderByAdmin) setSlideImage(data?.getOrderByAdmin?.modelData.modelImages[0]);
		}
	});

	/** LIFECYCLES **/
	useEffect(() => {
	if (orderId) {
		getOrderByAdminRefetch({ input: orderId });
		}
	}, [orderId]);

	useEffect(() => {
	if (router.query.id) {
		setOrderId(router.query.id as string);
	}
	}, [router]);

	/** HANDLERS **/
	const changeImageHandler = (image: string) => {
		setSlideImage(image);
	};

	const orderHistory = [
		{
			time: order?.createdAt,
			detail: 'Order received',
			extra: [
			{ label: 'Model Address', value: order?.modelData?.modelAddress },
			{ label: 'Agent Email', value: order?.agentData?.memberEmail },
			{ label: 'Warehouse', value: order?.buyerData?.memberAddress },
			],
		},
		{
			time: order?.updatedAt,
			detail: 'Order Confirmed',
		},
		{
			time: order?.paidAt,
			detail: 'Order Paid',
		},
	];

	if(getOrderByAdminLoading) {
		return (
			<Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '1080px' }}>
				<CircularProgress size={'4rem'}  sx={{ color: '#405FF2' }}/>
			</Stack>
		)
	}


	if (device === 'mobile') {
		return <div>ORDER DETAIL PAGE</div>;
	} else {
		return (
		<div id="order-detail-page">
		<div className="container">
			<Box className="header">
				<img
					src={slideImage ? `${REACT_APP_API_URL}/${slideImage}` : '/img/banner/header1.svg'}
					alt={'main-image'}
				/>
				<span className="status in-progress">In {order?.orderStatus}</span>
			</Box>

			<span className="order-number">Order #{order?._id}</span>
			<Stack className="order-summary">
				<Box className="item">
					Item: 
					<p>{order?.modelData?.modelTitle}</p>
				</Box>
				<Box className="item">
					Client Id: 
					<p>{order?.buyerId}</p>
				</Box>
				<Box className="item">
					Start time: 
					<p>
						Created At: {order?.createdAt ? dayjs(order.createdAt).format('YYYY-MM-DD HH:mm:ss') : 'N/A'}
					</p>
				</Box>
				<Box className="item">
					Address: 
					<p>{order?.buyerData?.memberAddress}</p>
				</Box>
			</Stack>

			<Stack className="order-history">
				{orderHistory.map((event, index) => (
					<Stack key={index} className="history-item">
					<span className="time">
						{event.time ? dayjs(event.time).format('YYYY-MM-DD HH:mm') : 'Processing...'}
					</span>
					<span className="detail">{event.detail}</span>

					{event.extra?.map((item, idx) => (
						<span key={idx} className={item.label.toLowerCase().replace(/\s/g, '-')}>
						{item.label}: {item.value ?? 'Proccessing...'}
						</span>
					))}

					{/* Uncomment if needed */}
					{/* <a href="#">See Details</a> */}
					</Stack>
				))}
			</Stack>
		</div>
		</div>
		);
	}
};


export default withLayoutBasic(OrderDetail);
