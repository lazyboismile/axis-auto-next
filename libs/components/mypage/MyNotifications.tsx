import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { userVar } from '../../../apollo/store';
import { DELETE_ALL_NOTIFICATIONS, READ_ALL_NOTIFICATIONS, READ_NOTICE } from '../../../apollo/user/mutation';
import { GET_ALL_NOTIFICATIONS } from '../../../apollo/user/query';
import { Messages, REACT_APP_API_URL } from '../../config';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { sweetMixinSuccessAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { T } from '../../types/common';
import { Notification } from '../../types/notification/notification';
import { NotificationsInquiry } from '../../types/notification/notification.input';
dayjs.extend(relativeTime);

interface MemberFollowingsProps {
	initialInput: NotificationsInquiry;
	redirectToMemberPageHandler: any;
}

const MyNotifications = (props: MemberFollowingsProps) => {
	const { initialInput, redirectToMemberPageHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [total, setTotal] = useState<number>(0);
	const category: any = router.query?.category ?? 'models';
	const [notificationsInquiry, setNotificationsInquiry] = useState<NotificationsInquiry>(initialInput);
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const user = useReactiveVar(userVar);

	/** APOLLO REQUESTS **/
	const [readNotification] = useMutation(READ_NOTICE);
	const [readAllNotifications] = useMutation(READ_ALL_NOTIFICATIONS);
	const [removeAllNotifications] = useMutation(DELETE_ALL_NOTIFICATIONS);

	const {
		loading: getNotificationsLoading,
		data: getNotificationsData,
		error: getNotificationsError,
		refetch: getNotificationsRefetch,
	} = useQuery(GET_ALL_NOTIFICATIONS, {
		fetchPolicy: "network-only",
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setNotifications(data?.getNotifications?.list);
			setTotal(data?.getNotifications?.metaCounter[0]?.total)
		}
	});

	/** LIFECYCLES **/

	useEffect(() => {
		getNotificationsRefetch({ input: notificationsInquiry }).then();
	}, [notificationsInquiry]);

	/** HANDLERS **/
	const paginationHandler = async (event: ChangeEvent<unknown>, value: number) => {
		notificationsInquiry.page = value;
		setNotificationsInquiry({ ...notificationsInquiry });
	};

	const readHandler = async (notificationId: string) => {
		try {
			await readNotification({
				variables: { input: notificationId },
			});
			await sweetMixinSuccessAlert("Readed notification", 800)
			await getNotificationsRefetch({ input: notificationsInquiry });
		} catch (err) {
			console.error("Error reading notification:", err);
		}
	};

	const readAllHandler = async (userId: string) => {
		try {
			if (!user._id) throw new Error(Messages.error2)

			await readAllNotifications({
				variables: {
					input: userId,
				},
			});

			await sweetTopSmallSuccessAlert('Already Clear!', 800);
			await getNotificationsRefetch();
		} catch (err: any) {
			console.log("Notifaction not available now:", err)
		}
	}

	const removeAllHandler = async (userId: string) => {
		try {
			if (!user._id) throw new Error(Messages.error2)

			await removeAllNotifications({
				variables: {
					input: userId,
				},
			});

			await sweetTopSmallSuccessAlert('Already Clear!', 800);
			await getNotificationsRefetch();
		} catch (err: any) {
			console.log("Notifaction not available now:", err)
		}
	}

	if (device === 'mobile') {
		return <div>AxisAuto MyNotifications MOBILE</div>;
	} else {
		return (
			<div id="member-follows-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">{category === 'myNotifications'}</Typography>
					</Stack>
				</Stack>
				<Stack className="follows-list-box">
					<Stack className="listing-title-box">
						<Typography className="title-text">Name</Typography>
						<Typography className="title-text">Details</Typography>
						<Typography className="title-text">Status</Typography>
					</Stack>
					<Stack className="listing-title-box-btn">
						<Button
						variant="contained"
						startIcon={<DoneAllIcon />}
						sx={{
							background: '#1976d2', // blue
							borderRadius: '12px',
							px: 3,
							textTransform: 'none',
							fontWeight: 600,
							':hover': { background: '#115293' }
						}}
						onClick={() => readAllHandler(user._id)}
						>
						Mark as Read
						</Button>

						<Button
						variant="contained"
						startIcon={<DeleteSweepIcon />}
						sx={{
							background: '#d32f2f', // red
							borderRadius: '12px',
							px: 3,
							textTransform: 'none',
							fontWeight: 600,
							ml: 2,
							':hover': { background: '#9a0007' }
						}}
						onClick={() => removeAllHandler(user._id)}
						>
						Delete All
						</Button>
					</Stack>
					{notifications?.length === 0 && (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>No Notifications yet!</p>
						</div>
					)}
					{notifications.map((notification: Notification) => {
						const imagePath: string = notification?.authorData?.memberImage
							? `${REACT_APP_API_URL}/${notification?.authorData?.memberImage}`
							: '/img/profile/defaultUser.svg';
						return (
							<Stack className="follows-card-box" key={notification._id}>
								<Stack className={'info'} onClick={() => redirectToMemberPageHandler(notification?.authorData?._id)}>
									<Stack className="image-box">
										<img src={imagePath} alt="" />
									</Stack>
									<Stack className="information-box">
										<Typography className="name">{notification?.authorData?.memberNick}</Typography>
									</Stack>
								</Stack>
								<Stack className={'details-box'}>
									<Box className={'info-box'} component={'div'}>
										<p>NEW</p>
										<span>{notification?.notificationType} FOR {notification?.notificationGroup}</span>
									</Box>
									<Box className={'info-box'} component={'div'}>
										 {notification?.createdAt ? dayjs(notification.createdAt).fromNow() : ""}
									</Box>
								</Stack>
								{notification?.notificationStatus && (
									<Stack className="action-box">
										{notification.notificationStatus === 'WAIT' ? (
											<Button
											variant="contained"
											sx={{ background: '#1976d2', ':hover': { background: '#115293' } }}
											onClick={() => readHandler(notification._id)}
											>
											Mark as Read
											</Button>
										) : (
											<Button
											disabled
											sx={{ background: '#2e7d32', color: '#2e7d32', cursor: 'default' }}
											>
											Already Read
											</Button>
										)}
									</Stack>
								)}
							</Stack>
						);
					})}
				</Stack>
				{notifications.length !== 0 && (
					<Stack className="pagination-config">
						<Stack className="pagination-box">
							<Pagination
								page={notificationsInquiry.page}
								count={Math.ceil(total / notificationsInquiry.limit)}
								onChange={paginationHandler}
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
							/>
						</Stack>
						<Stack className="total-result">
							<Stack className="total-result">
								<Typography>{total} notifications</Typography>
							</Stack>
						</Stack>
					</Stack>
				)}
			</div>
		);
	}
};

MyNotifications.defaultProps = {
	initialInput: {
		page: 1,
        limit: 5,
        sort: "createdAt",
        direction: "DESC",
        search: {

        }
	},
};

export default MyNotifications;
