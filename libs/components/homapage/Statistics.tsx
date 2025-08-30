import { Box, Stack } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const Statistics = () => {
    const device = useDeviceDetect();
    const { t, i18n } = useTranslation('common');

    if (device === 'mobile') {
        return (
            <Stack className={'statistics'}>
                <Stack className={'container'}>
                    <h1>{t("statisticsTitle")}</h1>
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
                                <span>{t("carsForSale")}</span>
                            </Box>
                            <Box className={'info-box-col'}>
                                <p className={'title'}>738M</p>
                                <span>{t("dealerReviews")}</span>
                            </Box>
                            <Box className={'info-box-col'}>
                                <p className={'title'}>100M</p>
                                <span>{t("visitorsPerDay")}</span>
                            </Box>
                            <Box className={'info-box-col'}>
                                <p className={'title'}>238M</p>
                                <span>{t("verifiedDealers")}</span>
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        );
    }
};

export default Statistics;
