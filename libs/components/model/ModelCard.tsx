import { useReactiveVar } from '@apollo/client';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Divider, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import React from 'react';
import { userVar } from '../../../apollo/store';
import { REACT_APP_API_URL } from '../../config';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Model } from '../../types/model/model';
import { formatterStr } from '../../utils';

interface ModelCardType {
	model: Model;
	likeModelHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const ModelCard = (props: ModelCardType) => { 
	const { model, likeModelHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = model?.modelImages[0]
		? `${REACT_APP_API_URL}/${model?.modelImages[0]}`
		: '/img/banner/header1.svg';

	if (device === 'mobile') {
		return <div>Model CARD</div>;
	} else {
		return (
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/model/detail',
							query: { id: model?._id},
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					{!recentlyVisited && (
						<Box component={'div'} className={'top-badge'}>
							<img src="/img/icons/camera-svgrepo-com.svg" alt="" />
							<span className="view-cnt">{model.modelViews}</span>
						</Box>
					)}
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/model/detail',
									query: { id: model?._id },
								}}
							>
								<p>{model.modelTitle}</p>
							</Link>
							{!recentlyVisited && (
							<IconButton color={'default'} onClick={() => likeModelHandler(user, model?._id)}>
									{myFavorites ? (
										<FavoriteIcon color="primary" />
									) : model?.meLiked && model?.meLiked[0]?.myFavorite ? (
										<FavoriteIcon color="primary" />
									) : (
										<FavoriteBorderIcon />
									)}
								</IconButton>
							)}
						</Stack>
						<Stack className="address">
							<Typography>
								{model.modelAddress}, {model.modelLocation}
							</Typography>
						</Stack>
					</Stack>
					<Divider sx={{ mb: '10px', background: '#585353' }} />
					<div className={'options'}>
						<div>
							<img src="/img/icons/miles.svg" alt="" />
							<span>{formatterStr(model.modelOdometer ?? 0)} {model.modelOdoUnit === 'KILOMETERS' ? 'km' : 'mi'}</span>
						</div>
						<div>
							<img src="/img/icons/fuelType.svg" alt="" />
							<span>{model.modelFuelType}</span>
						</div>
						<div>
							<img src="/img/icons/CVT.svg" alt="" />
							<span>{model.modelTransmission}</span>
						</div>
						<div>
							<img src="/img/icons/calendar.svg" alt="" />
							<span>{model.modelYear}</span>
						</div>
					</div>
					<Divider sx={{ mb: '10px', background: '#585353' }} />
					<div className={'bott'}>
						<p>${formatterStr(model.modelPrice)}</p>
						<Box className={'more-details'}>
							 <Link href={`/model/detail?id=${model._id}`}>
								<span>View Details</span>
							</Link>
							<img src="/img/icons/rightup.svg" alt="" />
						</Box>
					</div>
				</Stack>
			</Stack>
		);
	}
};

export default ModelCard;
