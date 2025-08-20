import { useReactiveVar } from '@apollo/client';
import { Box, Divider, Stack } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { userVar } from '../../../apollo/store';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Model } from '../../types/model/model';
import { formatterStr } from '../../utils';

interface ModelBigCardProps {
	model: Model;
}

const ModelBigCard = (props: ModelBigCardProps) => {
	const { model } = props;
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
					// style={{ backgroundImage: `url(${REACT_APP_API_URL}/${model?.modelImages?.[0]})` }}
                    style={{ backgroundImage: `url('/img/banner/header1.svg')` }}
				>
					{model?.modelRank && model?.modelRank >= 50 && (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					)}

					<div className={'price'}>${formatterStr(model?.modelPrice)}12000</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{model?.modelTitle}</strong>
					<p className={'desc'}>{model?.modelAddress}</p>
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
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>$15000</p>
						<Box className={'more-details'}>
							<Link href={'/model/detail'}>
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
