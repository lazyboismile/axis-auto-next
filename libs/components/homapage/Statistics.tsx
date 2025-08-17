import { Box, Stack } from '@mui/material';
import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const Statistics = () => {
	const device = useDeviceDetect();


	if (device === 'mobile') {
		return (
			<Stack className={'statistics'}>
				<Stack className={'container'}>
					<h1>Statistics</h1>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'statistics'}>
				<Stack className={'container'}>
					<Stack className={'sta-box'}>
                        <Stack className={'card-box'}>
                            <Box className={'info-box-col'}>
                                <p className={'title'}>836M</p>
                                <span>CARS FOR SALE</span>
                            </Box>
                            <Box className={'info-box-col'}>
                                <p className={'title'}>738M</p>
                                <span>DEALER REVIEWS</span>
                            </Box>
                            <Box className={'info-box-col'}>
                                <p className={'title'}>100M</p>
                                <span>VISITORS PER DAY</span>
                            </Box>
                            <Box className={'info-box-col'}>
                                <p className={'title'}>238M</p>
                                <span>VERIFIED DEALERS</span>
                            </Box>
                        </Stack>
                    </Stack>
				</Stack>
			</Stack>
		);
	}
};



export default Statistics;
