import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { Box, Stack } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const Map = () => {
	const device = useDeviceDetect();
    const {t , i18n} = useTranslation('common');


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
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.6707700530933!2d-83.29064102321644!3d42.60255587117139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824bf2690f65dbf%3A0x77ab62c301b15059!2sPenske%20Automotive%20Group%2C%20Inc.!5e1!3m2!1sru!2s!4v1755667211884!5m2!1sru!2s"
						width="100%"
						height="100%"
						style={{ border: 0 }}
						allowFullScreen={true}
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					></iframe>
                        <Stack className={'map-box'}>
                            <span>{t("getInTouch")}</span>
                            <p>{t("contactSales")}</p>
                            <Box className={'num'}>
                                <SmartphoneIcon/>
                                <p>+1 866 5468 7077</p>
                            </Box>
                            <p>{t("mondayHours")}</p>
                            <p>{t("tuesdayHours")}</p>
                            <p>{t("wednesdayHours")}</p>
                            <p>{t("thursdayHours")}</p>
                            <p>{t("fridayHours")}</p>
                            <p>{t("saturdayHours")}</p>
                            <p>{t("sundayHours")}</p>
                        </Stack>
                
			</Stack>
		);
	}
};



export default Map;
