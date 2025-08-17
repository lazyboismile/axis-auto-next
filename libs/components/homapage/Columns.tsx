import { Box, Stack } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const Columns = () => {
	const device = useDeviceDetect();


	if (device === 'mobile') {
		return (
			<Stack className={'columns'}>
				<Stack className={'container'}>
					<h1>Columns</h1>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'columns'}>
				<Stack className={'container'}>
					<Stack className={'columns-box'}>
                        <Stack className={'card-box'}>
                            <Box className={'info-box-col'}>
                                <p className={'title'}>Are You Looking For a Car ?</p>
                                <span>We are committed to providing our customers with exceptional service.</span>
                            </Box>
                            <div className={'button'}>
                                <Link href={'/account/join'}>
                                    <span>Get Started</span>
                                </Link>
                                <img src="/img/icons/discoveryWhite.svg" alt="" />
                            </div>
                            <Box className={'icon-img'}>
                                <img src="/img/banner/electric-car.svg" alt="" />
                            </Box>
                        </Stack>
                        <Stack className={'card-box-pink'}>
                            <Box className={'info-box-col'}>
                                <p className={'title'}>Are You Looking For a Car ?</p>
                                <span>We are committed to providing our customers with exceptional service.</span>
                            </Box>
                            <div className={'button'}>
                                <Link href={'/account/join'}>
                                    <span>Get Started</span>
                                </Link>
                                 <img src="/img/icons/discoveryWhite.svg" alt="" />
                            </div>
                            <Box className={'icon-img'}>
                                <img src="/img/banner/electric-car2.svg" alt="" />
                            </Box>
                        </Stack>
                    </Stack>
				</Stack>
			</Stack>
		);
	}
};



export default Columns;
