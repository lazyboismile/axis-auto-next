import { Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
const TuiEditor = dynamic(() => import('../community/Teditor'), { ssr: false });

const WriteArticle: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <>ARTICLE PAGE MOBILE</>;
	} else
		return (
			<div id="write-article-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">Write an Article</Typography>
						<Typography className="sub-title">Feel free to write your ideas!</Typography>
					</Stack>
				</Stack>
				<TuiEditor />
			</div>
		);
};

export default WriteArticle;
