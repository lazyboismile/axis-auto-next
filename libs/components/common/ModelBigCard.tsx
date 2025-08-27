import { useReactiveVar } from '@apollo/client';
import { Box, Divider, Stack } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { userVar } from '../../../apollo/store';
import { REACT_APP_API_URL } from '../../config';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Model } from '../../types/model/model';
import { formatterStr } from '../../utils';
;

interface ModelBigCardProps {
	model: Model;
	likeModelHandler?: any;
}

const ModelBigCard = (props: ModelBigCardProps) => {
	const { model, likeModelHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** HANDLERS **/
	const goModelDetatilPage = (modelId: string) => {
		router.push(`/model/detail?id=${modelId}`);
	};

	if (device === 'mobile') {
		return <div>Model BIG CARD</div>;
	} else {
		return (
			<Stack className="model-big-card-box" onClick={() => goModelDetatilPage(model?._id)}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${model?.modelImages?.[0]})` }}
				>
					{model?.modelRank && model?.modelRank >= 50 && (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					)}

					<div className={'price'}>
						${formatterStr(model?.modelPrice)}
					</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{model?.modelTitle}</strong>
					<p className={'desc'}>{model?.modelAddress}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/miles.svg" alt="" />
							<span>{formatterStr(model?.modelOdometer ?? 0)} {model?.modelOdoUnit === 'KILOMETERS' ? 'km' : 'mi'}</span>
						</div>
						<div>
							<img src="/img/icons/fuelType.svg" alt="" />
							<span>{model?.modelFuelType}</span>
						</div>
						<div>
							<img src="/img/icons/CVT.svg" alt="" />
							<span>{model?.modelTransmission}</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
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

export default ModelBigCard;
