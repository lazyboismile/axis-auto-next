import { useReactiveVar } from '@apollo/client';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Divider, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import React from 'react';
import { userVar } from '../../../apollo/store';
import useDeviceDetect from '../../hooks/useDeviceDetect';

// interface ModelCardType {
// 	model: Model;
// 	likeModelHandler?: any;
// 	myFavorites?: boolean;
// 	recentlyVisited?: boolean;
// }

const ModelCard = () => { //props: ModelCardType
	// const { model, likeModelHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = '/img/banner/header1.svg';

	if (device === 'mobile') {
		return <div>Model CARD</div>;
	} else {
		return (
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/model/detail',
							query: { id: '/model/detail'},
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					
						<Box component={'div'} className={'top-badge'}>
							<img src="/img/icons/camera-svgrepo-com.svg" alt="" />
							<span className="view-cnt">120</span>
						</Box>
					
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/model/detail',
									query: { id: '/model/detail'},
								}}
							>
								<Typography>Title</Typography>
							</Link>
							<IconButton color={'default'}>
								{/* <FavoriteIcon color="primary" /> */}
								<FavoriteBorderIcon />
							<span className="view-cnt">77</span>
							</IconButton>
						</Stack>
						<Stack className="address">
							<Typography>
								address, location
							</Typography>
						</Stack>
					</Stack>
					<Divider sx={{ mb: '10px', background: '#585353' }} />
					<div className={'options'}>
						<div>
							<img src="/img/icons/miles.svg" alt="" />
							<span>15 miles</span>
						</div>
						<div>
							<img src="/img/icons/fuelType.svg" alt="" />
							<span>Petrol</span>
						</div>
						<div>
							<img src="/img/icons/CVT.svg" alt="" />
							<span>Automatice</span>
						</div>
						<div>
							<img src="/img/icons/CVT.svg" alt="" />
							<span>Automatice</span>
						</div>
					</div>
					<Stack className="divider"></Stack>
					<Stack className="type-buttons">
						
							<Stack className="buttons">
								
								
							</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default ModelCard;
