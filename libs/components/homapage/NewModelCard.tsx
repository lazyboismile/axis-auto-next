import { useReactiveVar } from '@apollo/client';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Divider, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { userVar } from '../../../apollo/store';
import { modelDescShort, REACT_APP_API_URL, topModelOdometer } from '../../config';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Model } from '../../types/model/model';
import { formatterStr } from '../../utils';

interface NewModelCardProps {
	model: Model;
}

const NewModelCard = (props: NewModelCardProps) => {
	const { model } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailHandler =  async (modelId: string) => {
		console.log('modelId:', modelId)
		await router.push({
			pathname: '/model/detail',
			query: {id: modelId} 
		});
	}

	if (device === 'mobile') {
		return (
			<Stack className="top-card-box" key={model._id}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${model?.modelImages[0]})` }}
					onClick={() => pushDetailHandler(model._id)}
				>
						{model && model?.modelOdometer <= topModelOdometer &&(
							<div className="status">
								<span>Low Mileage</span>
							</div>
						)}

						<div className="view-like-box">
							<IconButton color={'inherit'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{model.modelViews}</Typography>
						</div>
						<Divider sx={{ mt: '15px', mb: '17px', background: '#585353' }} />
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'} onClick={() => pushDetailHandler(model._id)}>{model.modelYear} - {model.modelTitle}</strong>
					<p className={'desc'}>{model.modelDesc
						? model.modelDesc.length > modelDescShort
						? model.modelDesc.substring(0, modelDescShort) + "..."
						: model.modelDesc
						: "No desc"}
					</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/miles.svg" alt="" />
							<span>
								{formatterStr(model.modelOdometer)} {model.modelOdoUnit === "KILOMETERS" ? "km" : "mi"}
							</span>
						</div>
						<div>
							<img src="/img/icons/fuelType.svg" alt="" />
							<span>{model.modelFuelType}</span>
						</div>
						<div>
							<img src="/img/icons/CVT.svg" alt="" />
							<span>{model.modelTransmission}</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px', background: '#585353' }} />
					<div className={'bott'}>
						<p>${formatterStr(model.modelPrice)}</p>
						<Box className={'more-details'}>
							<Link href={`/model/detail?id=${model._id}`}>
								<span>View Details</span>
							</Link>
							<img src="/img/icons/rightup.svg" alt="" />
						</Box>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="new-card-box" key={model._id}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${model?.modelImages[0]})` }}
					onClick={() => pushDetailHandler(model._id)}
				>
						{model && model?.modelOdometer <= topModelOdometer &&(
							<div className="status">
								<span>Low Mileage</span>
							</div>
						)}

						<div className="view-like-box">
							<IconButton color={'inherit'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{model.modelViews}</Typography>
						</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'} onClick={() => pushDetailHandler(model._id)}>{model.modelYear} - {model.modelTitle}</strong>
					<p className={'desc'}>{model.modelDesc
						? model.modelDesc.length > modelDescShort
						? model.modelDesc.substring(0, modelDescShort) + "..."
						: model.modelDesc
						: "No desc"}
					</p>
					<Divider sx={{ mt: '15px', mb: '17px', background: '#585353' }} />
					<div className={'options'}>
						<div>
							<img src="/img/icons/miles.svg" alt="" />
							<span>
								{formatterStr(model.modelOdometer)} {model.modelOdoUnit === "KILOMETERS" ? "km" : "mi"}
							</span>
						</div>
						<div>
							<img src="/img/icons/fuelType.svg" alt="" />
							<span>{model.modelFuelType}</span>
						</div>
						<div>
							<img src="/img/icons/CVT.svg" alt="" />
							<span>{model.modelTransmission}</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px', background: '#585353' }} />
					<div className={'bott'}>
						<p>${formatterStr(model.modelPrice)}</p>
						<Box className={'more-details'}>
							<Link href={`/model/detail?id=${model._id}`}>
								<span>View Details</span>
							</Link>
							<img src="/img/icons/rightup.svg" alt="" />
						</Box>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default NewModelCard;
