import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { Logout } from '@mui/icons-material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { Badge, Box, IconButton, Popover, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter, withRouter } from 'next/router';
import { CaretDown } from 'phosphor-react';
import React, { useCallback, useEffect, useState } from 'react';
import { userVar } from '../../apollo/store';
import { READ_ALL_NOTIFICATIONS } from '../../apollo/user/mutation';
import { GET_ALL_NOTIFICATIONS } from '../../apollo/user/query';
import { getJwtToken, logOut, updateUserInfo } from '../auth';
import { Messages, REACT_APP_API_URL } from '../config';
import { NotificationStatus } from '../enums/notification.enum';
import useDeviceDetect from '../hooks/useDeviceDetect';
import { sweetTopSmallSuccessAlert } from '../sweetAlert';
import { T } from '../types/common';
import { Notification } from '../types/notification/notification';
import { AllNotificationInquiry } from '../types/notification/notification.input';

interface NotificationProps {
	initialInput: AllNotificationInquiry;
}

const TopWhite = (props: NotificationProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const [lang, setLang] = useState<string | null>('en');
	const drop = Boolean(anchorEl2);
	const [colorChange, setColorChange] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
	let open = Boolean(anchorEl);
	const [bgColor, setBgColor] = useState<boolean>(false);
	const [logoutAnchor, setLogoutAnchor] = React.useState<null | HTMLElement>(null);
	const logoutOpen = Boolean(logoutAnchor);
	const [notifications, setNotifications] = useState<Notification[]>([]);

	/** APOLLO REQUESTS **/
	const [readAllNotifications] = useMutation(READ_ALL_NOTIFICATIONS);

	const {
		loading: getNotificationsLoading,
		data: getNotificationsData,
		error: getNotificationsError,
		refetch: getNotificationsRefetch,
	} = useQuery(GET_ALL_NOTIFICATIONS, {
		fetchPolicy: "cache-and-network",
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setNotifications(data?.getNotifications?.list);
		}
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (localStorage.getItem('locale') === null) {
			localStorage.setItem('locale', 'en');
			setLang('en');
		} else {
			setLang(localStorage.getItem('locale'));
		}
	}, [router]);

	useEffect(() => {
		switch (router.pathname) {
			case '/model/detail':
				setBgColor(true);
				break;
			default:
				break;
		}
	}, [router]);

	useEffect(() => {
		const jwt = getJwtToken();
		if (jwt) updateUserInfo(jwt);
	}, []);

	/** HANDLERS **/
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
	
	const langClick = (e: any) => {
		setAnchorEl2(e.currentTarget);
	};

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	

	const langClose = () => {
		setAnchorEl2(null);
	};

	const langChoice = useCallback(
		async (e: any) => {
			setLang(e.target.id);
			localStorage.setItem('locale', e.target.id);
			setAnchorEl2(null);
			await router.push(router.asPath, router.asPath, { locale: e.target.id });
		},
		[router],
	);

	const changeNavbarColor = () => {
		if (window.scrollY >= 50) {
			setColorChange(true);
		} else {
			setColorChange(false);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleHover = (event: any) => {
		if (anchorEl !== event.currentTarget) {
			setAnchorEl(event.currentTarget);
		} else {
			setAnchorEl(null);
		}
	};

	const StyledMenu = styled((props: MenuProps) => (
		<Menu
			elevation={0}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			{...props}
		/>
	))(({ theme }) => ({
		'& .MuiPaper-root': {
			top: '109px',
			borderRadius: 6,
			marginTop: theme.spacing(1),
			minWidth: 160,
			color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
			boxShadow:
				'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
			'& .MuiMenu-list': {
				padding: '4px 0',
			},
			'& .MuiMenuItem-root': {
				'& .MuiSvgIcon-root': {
					fontSize: 18,
					color: theme.palette.text.secondary,
					marginRight: theme.spacing(1.5),
				},
				'&:active': {
					backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
				},
			},
		},
	}));

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', changeNavbarColor);
	}

	if (device == 'mobile') {
		return (
			<Stack className={'top'}>
				<Link href={'/'}>
					<div>{t('Home')}</div>
				</Link>
				<Link href={'/model'}>
					<div>{t('Showroom')}</div>
				</Link>
				<Link href={'/agent'}>
					<div> {t('Agents')} </div>
				</Link>
				<Link href={'/community?articleCategory=FREE'}>
					<div> {t('Blog')} </div>
				</Link>
        <Link href={'/about'}>
					<div> {t('About')} </div>
				</Link>
				<Link href={'/cs'}>
					<div> {t('CS')} </div>
				</Link>
			</Stack>
		);
	} else {
		return (
			<Stack className={'navbar-white'}>
				<Stack className={`navbar-main ${colorChange ? 'transparent' : ''} ${bgColor ? 'transparent' : ''}`}>
					<Stack className={'container'}>
						<Box component={'div'} className={'logo-box'}>
							<Link href={'/'}>
								<img src="/img/logo/logoWhite.svg" alt="" />
							</Link>
						</Box>
						<Box component={'div'} className={'router-box'}>
							<Link href={'/'}>
								<div>{t('Home')}</div>
							</Link>
							<Link href={'/model'}>
								<div>{t('Showroom')}</div>
							</Link>
							<Link href={'/agent'}>
								<div> {t('Agents')} </div>
							</Link>
							<Link href={'/community?articleCategory=FREE'}>
								<div> {t('Blog')} </div>
							</Link>
              <Link href={'/about'}>
								<div> {t('About')} </div>
							</Link>
							{user?._id && (
								<Link href={'/mypage'}>
									<div> {t('My Page')} </div>
								</Link>
							)}
							<Link href={'/cs'}>
								<div> {t('CS')} </div>
							</Link>
								<Box><SmartphoneIcon/><span>+1 866 5468 7077</span></Box>
						</Box>
						<Box component={'div'} className={'user-box'}>
							{user?._id ? (
								<>
									<div className={'login-user'} onClick={(event: any) => setLogoutAnchor(event.currentTarget)}>
										<img
											src={
												user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'
											}
											alt=""
										/>
									</div>

									<Menu
										id="basic-menu"
										anchorEl={logoutAnchor}
										open={logoutOpen}
										onClose={() => {
											setLogoutAnchor(null);
										}}
										sx={{ mt: '5px' }}
									>
										<MenuItem onClick={() => logOut()}>
											<Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
											Logout
										</MenuItem>
									</Menu>
								</>
							) : (
								<Link href={'/account/join'}>
									<div className={'join-box'}>
										<AccountCircleOutlinedIcon />
										<span>
											{t('Sign In')}
										</span>
									</div>
								</Link>
							)}

							<div className={'lan-box'}>
								{user?._id && (
									<Box>
									<Badge
										badgeContent={notifications.length}
										color="error"
										overlap="circular"
										invisible={notifications.length === 0}
									>
										<IconButton onClick={handleClick} sx={{ color: "#1976d2" }}>
										<NotificationsOutlinedIcon />
										</IconButton>
									</Badge>

									<Popover
										open={open}
										anchorEl={anchorEl}
										onClose={handleClose}
										anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
										transformOrigin={{ vertical: "top", horizontal: "right" }}
										PaperProps={{
										sx: {
											width: 320,
											borderRadius: 3,
											boxShadow: 4,
											p: 0,
											overflow: "hidden",
										},
										}}
									>
										{/* Header */}
										<Box
										sx={{
											px: 3,
											py: 1.5,
											backgroundColor: "#1976d2",
											color: "#fff",
											fontWeight: 600,
											fontSize: "16px",
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
										}}
										>
										<span>Notifications</span>
										{notifications.some(n => n.notificationStatus === "WAIT") && (
											<Button
											size="small"
											variant="contained"
											color="secondary"
											sx={{
												textTransform: "none",
												fontSize: "13px",
												backgroundColor: "#fff",
												color: "#1976d2",
												"&:hover": { backgroundColor: "#f0f0f0" },
											}}
											onClick={() => readAllHandler(user._id)}
											>
											Mark All Read
											</Button>
										)}
										</Box>

										{/* List */}
										<Box sx={{ maxHeight: 280, overflowY: "auto", bgcolor: "#f9f9f9" }}>
										{notifications.length > 0 ? (
											notifications.map((notification: Notification) => (
											<Box
												key={notification._id}
												sx={{
												px: 3,
												py: 1.5,
												display: "flex",
												alignItems: "center",
												gap: 1.5,
												backgroundColor:
													notification.notificationStatus === "WAIT"
													? "#e3f2fd"
													: "transparent",
												cursor: "pointer",
												"&:hover": { backgroundColor: "#d0e7ff" },
												borderBottom: "1px solid #eee",
												}}
											>
												<Box
												component="img"
												src={
													notification?.authorData?.memberImage
													? `${REACT_APP_API_URL}/${notification.authorData.memberImage}`
													: "/img/profile/defaultUser.svg"
												}
												alt={notification?.authorData?.memberNick}
												sx={{
													width: 32,
													height: 32,
													borderRadius: "50%",
													objectFit: "cover",
												}}
												/>
												<Box sx={{ flex: 1 }}>
												<Box sx={{ fontWeight: 500 }}>
													{notification.notificationTitle}
												</Box>
												<Box sx={{ fontSize: 12, color: "#555" }}>
													from {notification?.authorData?.memberNick}
												</Box>
												</Box>
											</Box>
											))
										) : (
											<Box
											sx={{
												px: 3,
												py: 6,
												textAlign: "center",
												color: "#888",
												fontSize: "14px",
											}}
											>
											No notifications
											</Box>
										)}
										</Box>
									</Popover>
									</Box>
								)}
								<Button
									disableRipple
									className="btn-lang"
									onClick={langClick}
									endIcon={<CaretDown size={14} color="#616161" weight="fill" />}
								>
									<Box component={'div'} className={'flag'}>
										{lang !== null ? (
											<img src={`/img/flag/lang${lang}.png`} alt={'usaFlag'} />
										) : (
											<img src={`/img/flag/langen.png`} alt={'usaFlag'} />
										)}
									</Box>
								</Button>

								<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose} sx={{ position: 'absolute' }}>
									<MenuItem disableRipple onClick={langChoice} id="en">
										<img
											className="img-flag"
											src={'/img/flag/langen.png'}
											onClick={langChoice}
											id="en"
											alt={'usaFlag'}
										/>
										{t('English')}
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="kr">
										<img
											className="img-flag"
											src={'/img/flag/langkr.png'}
											onClick={langChoice}
											id="kr"
											alt={'koreanFlag'}
										/>
										{t('Korean')}
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="ru">
										<img
											className="img-flag"
											src={'/img/flag/langru.png'}
											onClick={langChoice}
											id="ru"
											alt={'russiaFlag'}
										/>
										{t('Russian')}
									</MenuItem>
                  					<MenuItem disableRipple onClick={langChoice} id="uz">
										<img
											className="img-flag"
											src={'/img/flag/languz.png'}
											onClick={langChoice}
											id="uz"
											alt={'uzbekistanFlag'}
										/>
										{t('Uzbek')}
									</MenuItem>
								</StyledMenu>
							</div>
						</Box>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TopWhite.defaultProps = {
	initialInput: {
		page: 1,
        limit: 10,
        sort: "createdAt",
        direction: "DESC",
        search: {
			notificationStatus: NotificationStatus.WAIT
		}
	},
};

//@ts-ignore
export default withRouter(TopWhite);
