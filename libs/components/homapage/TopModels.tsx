import { useQuery } from '@apollo/client';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GET_MODELS } from '../../../apollo/user/query';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { T } from '../../types/common';
import { Model } from '../../types/model/model';
import { ModelsInquiry } from '../../types/model/model.input';
import TopModelCard from './TopModelCard';

interface TopModelsProps {
	initialInput: ModelsInquiry;
}

const TopModels = (props: TopModelsProps) => {
	const { initialInput } = props;
	const { t, i18n } = useTranslation('common');
	const device = useDeviceDetect();
	const [topModels, setTopModels] = useState<Model[]>([]);

	/** APOLLO REQUESTS **/
	
	const {
		loading: getModelsLoading,
		data: getModelsData,
		error: getModelsError,
		refetch: getModelsRefetch,
	} = useQuery(GET_MODELS, {
		fetchPolicy: "cache-and-network",
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTopModels(data?.getModels?.list);
		}
	});

	/** HANDLERS **/

	if (topModels) console.log('topModels:', topModels);
	if (!topModels) return null;


	if (device === 'mobile') {
		return (
			<Stack className={'top-models'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>{t("recommendedCarsForYou")}</span>
					</Stack>
					<Stack className={'card-box'}>
						{topModels.length === 0 ? (
								<p  className='no-top'>No top recommended to show</p>
						) : (
						<Swiper
							className={'top-model-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={25}
							modules={[Autoplay]}
						>
							 
								{topModels.map((model: Model) => (
									<SwiperSlide key={model._id} className="top-model-slide">
										<TopModelCard model={model}/>
									</SwiperSlide>
								))}
							
						</Swiper>
					)}
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'top-models'}>
				<Stack className={'container'}>
					<Stack className={'card-box-title'}>
						<Box component={'div'} className={'title'}>
							<p>{t("recommendedCarsForYou")}</p>
						</Box>
					</Stack>
					<Stack className="card-box">
						{topModels.length === 0 ? (
							<p className='no-top'>No top model to show</p>
						) : (
							<Swiper
							className="top-model-swiper"
							slidesPerView="auto"
							spaceBetween={25}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-top-next',
								prevEl: '.swiper-top-prev',
							}}
							pagination={{
								el: '.swiper-top-pagination',
							}}
							>
							{topModels.map((model: Model) => (
								<SwiperSlide key={model._id} className="top-model-slide">
								<TopModelCard model={model} />
								</SwiperSlide>
							))}
							</Swiper>
						)}
					</Stack>

					<Stack className={'pagination-box'}>
						<WestIcon className={'swiper-top-prev'} />
						<div className={'swiper-top-pagination'}></div>
						<EastIcon className={'swiper-top-next'} />
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TopModels.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'modelRank',
		direction: 'DESC',
		search: {},
	},
};

export default TopModels;
