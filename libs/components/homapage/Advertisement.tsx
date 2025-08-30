import { Box, Stack } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const Advertisement = () => {
    const device = useDeviceDetect();
    const { t, i18n } = useTranslation('common');

    if (device === 'mobile') {
        return (
            <Stack className={'advertisement'}>
                <Stack className={'container'}>
                    <h1>{t("advertisementTitle")}</h1>
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
                                <p className={'title'}>{t("adsTitle")}</p>
                                <span>{t("adsDescription")}</span>
                            </Box>
                            <div className={'button'}>
                                <Link href={'/account/join'}>
                                    <span>{t("getStarted")}</span>
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
