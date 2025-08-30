import { Box, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';

function About() {
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');

	if (device === 'mobile') {
		return (
			<Stack className={'about'}>
				<Stack className={'container'}>
					<h1>{t('aboutPage.title')}</h1>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'about'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box className={"title"}>
							<p>{t('aboutPage.subtitle')}</p>
						</Box>
						<Stack className={'flash'}>
							<Box className={'flash-desc'}>
								<img src="/img/icons/f-d-1.svg" alt="icon" />
								<p>{t('aboutPage.cards.0.title')}</p>
								<span>{t('aboutPage.cards.0.desc')}</span>
							</Box>
							<Box className={'flash-desc'}>
								<img src="/img/icons/f-d-2.svg" alt="icon" />
								<p>{t('aboutPage.cards.1.title')}</p>
								<span>{t('aboutPage.cards.1.desc')}</span>
							</Box>
							<Box className={'flash-desc'}>
								<img src="/img/icons/f-d-3.svg" alt="icon" />
								<p>{t('aboutPage.cards.2.title')}</p>
								<span>{t('aboutPage.cards.2.desc')}</span>
							</Box>
							<Box className={'flash-desc'}>
								<img src="/img/icons/f-d-4.svg" alt="icon" />
								<p>{t('aboutPage.cards.3.title')}</p>
								<span>{t('aboutPage.cards.3.desc')}</span>
							</Box>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}
}

export default About;
