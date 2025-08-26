import { useQuery } from '@apollo/client';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GET_MODELS } from '../../../apollo/user/query';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { T } from '../../types/common';
import { Model } from '../../types/model/model';
import { ModelsInquiry } from '../../types/model/model.input';
import PopularModelCard from './PopularModelCard';

interface PopularModelsProps {
	initialInput: ModelsInquiry;
}

const PopularModels = (props: PopularModelsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [popularModels, setPopularModels] = useState<Model[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
			setPopularModels(data?.getModels?.list || []);
		}
	});

	useEffect(() => {
		if (selectedCategory === 'ALL') {
			getModelsRefetch({ input: initialInput }).then((res) => {
				setPopularModels(res?.data?.getModels?.list || []);
			});
		} else if (selectedCategory) {
			getModelsRefetch({
				input: {
					...initialInput,
					search: { typeList: [selectedCategory.toUpperCase()] },
				},
			}).then((res) => {
				setPopularModels(res?.data?.getModels?.list || []);
			});
		}
	}, [selectedCategory, initialInput]);



	/** HANDLER **/
	const handleCategoryClick = (category: string) => {
		setSelectedCategory(category);
	};

	if (!popularModels) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'popular-models'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>The Most Searched Cars</span>
					</Stack>
					<Stack className={'card-box'}>
						{popularModels.length === 0 ? (
							<p className='no-popular'>No popular to show</p>
						) : (
							<Swiper
								className={'popular-model-swiper'}
								slidesPerView={'auto'}
								centeredSlides={true}
								spaceBetween={25}
								modules={[Autoplay]}
							>
								{popularModels.map((model: Model) => (
									<SwiperSlide key={model._id} className="popular-model-slide">
										<PopularModelCard model={model} />
									</SwiperSlide>
								))}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
	return (
		<Stack className={'popular-models'}>
			<Stack className={'container'}>
				<Stack className={'card-box-title'}>
					<Box component={'div'} className={'title'}>
						<p>The Most Searched Cars</p>
					</Box>
					<Box component={'div'} className={'title-search'}>
						{['ALL','SEDAN', 'SUV', 'CONVERTIBLE', 'HATCHBACK'].map((category) => (
							<p
								key={category}
								className={selectedCategory === category ? 'active' : ''}
								onClick={() => handleCategoryClick(category)}
							>
								{category}
							</p>
						))}
					</Box>
				</Stack>
				<Stack className={'card-box'}>
					{popularModels.length === 0 ? (
						<p className='no-popular'>No popular model to show</p>
					) : (
						<Swiper
							 key={selectedCategory + '-' + popularModels.length}
							className="popular-model-swiper"
							slidesPerView="auto"
							spaceBetween={25}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-popular-next',
								prevEl: '.swiper-popular-prev',
							}}
							pagination={{
								el: '.swiper-popular-pagination',
							}}
						>
							{popularModels.map((model: Model) => (
								<SwiperSlide key={model._id} className="popular-model-slide">
									<PopularModelCard model={model} />
								</SwiperSlide>
							))}
						</Swiper>
					)}
				</Stack>
				<Stack className={'pagination-box'}>
					<WestIcon className={'swiper-popular-prev'} />
					<div className={'swiper-popular-pagination'}></div>
					<EastIcon className={'swiper-popular-next'} />
				</Stack>
			</Stack>
		</Stack>
	);
};

PopularModels.defaultProps = {
	initialInput: {
		page: 1,
		limit: 7,
		sort: 'modelViews',
		direction: 'DESC',
		search: {},
	},
};

export default PopularModels;
