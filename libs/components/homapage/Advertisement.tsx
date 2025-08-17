import { Box, Stack } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const Advertisement = () => {
	const device = useDeviceDetect();


	if (device === 'mobile') {
		return (
			<Stack className={'advertisement'}>
				<Stack className={'container'}>
					<h1>advertisement</h1>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'advertisement'}>
				<Stack className={'container'}>
					<Stack className={'ads-box'}>
                        <Stack className={'ads-img'}>
                            <img src="img/banner/aboutBanner.svg" alt="" />
                        </Stack>
                        <Stack className={'ads-info'}>
                            <Box className={'info-box-col'}>
                                <p className={'title'}>Online, in-person,
everywhere</p>
                                <span>Choose from thousands of vehicles from multiple brands and buy online with Click
& Drive, or visit us at one of our dealerships today.</span>
                            </Box>
                            <div className={'button'}>
                                <Link href={'/account/join'}>
                                    <span>Get Started</span>
                                </Link>
                                 <img src="/img/icons/discoveryWhite.svg" alt="" />
                            </div>
                        </Stack>
                    </Stack>
				</Stack>
			</Stack>
		);
	}
};



export default Advertisement;
