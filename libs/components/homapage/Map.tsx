import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { Box, Stack } from '@mui/material';
import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const Map = () => {
	const device = useDeviceDetect();


	if (device === 'mobile') {
		return (
			<Stack className={'map'}>
				<Stack className={'container'}>
					<h1>Map</h1>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'map'}>
                    <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1468.3779917018537!2d-83.2879598!3d42.602920499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824bf2690f65dbf%3A0x77ab62c301b15059!2sPenske%20Automotive%20Group%2C%20Inc.!5e0!3m2!1sru!2s!4v1755253219201!5m2!1sru!2s"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
					<Stack className={'map-box'}>
                        <span>Get in Touch</span>
                        <p>Contact our Sales Departament</p>
                        <Box className={'num'}>
                            <SmartphoneIcon/>
                            <p>+1 866 5468 7077</p>
                        </Box>
                        <p>Monday: 9:00-13:00</p>
                        <p>Tuesday: 9:00-13:00</p>
                        <p>Wednesday: 9:00-13:00</p>
                        <p>Thursday: 9:00-13:00</p>
                        <p>Friday: 9:00-13:00</p>
                        <p>Saturday: 9:00-13:00</p>
                        <p>Sunday: Closed</p>
                    </Stack>
                
			</Stack>
		);
	}
};



export default Map;
