import { useQuery } from '@apollo/client';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GET_MODELS } from '../../../apollo/user/query';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { T } from '../../types/common';
import { Model } from '../../types/model/model';
import { ModelsInquiry } from '../../types/model/model.input';
import NewModelCard from './NewModelCard';

interface NewModelsProps {
	initialInput: ModelsInquiry;
}

const NewModels = (props: NewModelsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [newModels, setNewModels] = useState<Model[]>([]);

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
			setNewModels(data?.getModels?.list || []);
		}
	});
	
	/** HANDLERS **/


	if (device === 'mobile') {
		return (
			<Stack className={'new-models'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Upcoming Cars</span>
					</Stack>
					<Stack className={'card-box'}>
						{newModels.length === 0 ? (
							<p className={'no-new'}>No new upcoming to show</p>
						) : (
						<Swiper
							className={'new-model-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={25}
							modules={[Autoplay]}
						>
							
								{newModels.map((model: Model) => (
									<SwiperSlide key={model._id} className="new-model-slide">
										<NewModelCard model={model} />
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
			<Stack className={'new-models'}>
				<Stack className={'container'}>
					<Stack className={'card-box-title'}>
						<Box component={'div'} className={'title'}>
							<p>Upcoming Cars</p>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						{newModels.length === 0 ? (
							<p className={'no-new'}>No new upcoming to show</p>
						) : (
							<Swiper
								className={'new-model-swiper'}
								slidesPerView={'auto'}
								spaceBetween={25}
								modules={[Autoplay, Navigation, Pagination]}
								navigation={{
									nextEl: '.swiper-new-next',
									prevEl: '.swiper-new-prev',
								}}
								pagination={{
									el: '.swiper-new-pagination',
								}}
							>
									{newModels.map((model: Model) => (
										<SwiperSlide key={model._id} className="new-model-slide">
											<NewModelCard model={model}/>
										</SwiperSlide>
									))}
							</Swiper>
						)}
					</Stack>
					<Stack className={'pagination-box'}>
						<WestIcon className={'swiper-new-prev'} />
						<div className={'swiper-new-pagination'}></div>
						<EastIcon className={'swiper-new-next'} />
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

NewModels.defaultProps = {
	initialInput: {
		page: 1,
		limit: 7,
		sort: 'createdAt',
		direction: 'DESC',
		search: {},
	},
};

export default NewModels;
