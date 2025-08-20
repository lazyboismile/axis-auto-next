import { useReactiveVar } from '@apollo/client';
import { Stack } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { userVar } from '../../../apollo/store';
import { getJwtToken, updateUserInfo } from '../../auth';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Footer from '../Footer';
import Top from '../Top';
import TopWhite from '../TopWhite';

const withLayoutFull = (Component: any) => {
	return (props: any) => {
		const router = useRouter();
		const device = useDeviceDetect();
		const user = useReactiveVar(userVar);

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		/** HANDLERS **/

		if (device == 'mobile') {
			return (
				<>
					<Head>
						<title>AxisAuto</title>
						<meta name={'title'} content={`AxisAuto`} />
					</Head>
					<Stack id="mobile-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		} else {
			return (
				<>
					<Head>
						<title>AxisAuto</title>
						<meta name={'title'} content={`AxisAuto`} />
					</Head>
					<Stack id="pc-wrap">
						<Stack id={'top'}>
							<TopWhite />
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						{/* {user?._id && <Chat />} */}

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		}
	};
};

export default withLayoutFull;
