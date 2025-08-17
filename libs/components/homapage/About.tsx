import { Box, Stack } from '@mui/material';
import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';


function About() {
	const device = useDeviceDetect();

    if (device === 'mobile') {
            return (
                <Stack className={'about'}>
                    <Stack className={'container'}>
                        <h1>About</h1>
                    </Stack>
                </Stack>
            );
        } else {
            return (
                <Stack className={'about'}>
				    <Stack className={'container'}>
                        <Stack className={'info-box'}>
                            <Box className={"title"}>
                                <p>We're BIG on what matters to you</p>
                            </Box>
                            <Stack className={'flash'}>
                                <Box className={'flash-desc'}>
                                    <img src="/img/icons/f-d-1.svg" alt="icon" />
                                    <p>Special Financing Offers</p>
                                    <span>Flexible payment plans and low-interest financing options tailored to your needs.</span>
                                </Box>
                                <Box className={'flash-desc'}>
                                    <img src="/img/icons/f-d-2.svg" alt="icon" />
                                    <p>Trusted Car Dealership</p>
                                    <span>Years of reliable service and a reputation built on honesty and transparency.</span>
                                </Box>
                                <Box className={'flash-desc'}>
                                    <img src="/img/icons/f-d-3.svg" alt="icon" />
                                    <p>Transparent Pricing</p>
                                    <span>Clear, upfront pricing with no hidden fees or unexpected surprises.</span>
                                </Box>
                                <Box className={'flash-desc'}>
                                    <img src="/img/icons/f-d-4.svg" alt="icon" />
                                    <p>Expert Car Service</p>
                                    <span>Certified mechanics providing top-notch maintenance and repair services.</span>
                                </Box>  
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            );
        }
}

export default About
