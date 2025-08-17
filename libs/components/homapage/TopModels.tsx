import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import TopModelCard from './TopModelCard';

// interface TopModelsProps {
// 	initialInput: ModelsInquiry;
// }

const TopModels = ({ initialInput = [], ...props }: any) => {
	// const { initialInput } = props;
	const device = useDeviceDetect();
	const [topModels, setTopModels] = useState<number[]>(
		initialInput.length ? initialInput : [1, 2, 3, 4, 5, 6, 7]
	);

	/** APOLLO REQUESTS **/
	/** HANDLERS **/


	if (device === 'mobile') {
		return (
			<Stack className={'top-models'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Recommended Cars For You</span>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'top-model-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={25}
							modules={[Autoplay]}
						>
							{topModels.length === 0 ? (
								<p>No top properties to show</p>
								) : (
								topModels.map((model, index) => (
									<SwiperSlide key={index} className="top-model-slide">
										<TopModelCard />
									</SwiperSlide>
								))
							)}
						</Swiper>
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
							<p>Recommended Cars For You</p>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'top-model-swiper'}
							slidesPerView={'auto'}
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
							{topModels.length === 0 ? (
								<p>No top properties to show</p>
								) : (
								topModels.map((model, index) => (
									<SwiperSlide key={index} className="top-model-slide">
										<TopModelCard />
									</SwiperSlide>
								))
							)}
						</Swiper>
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
		limit: 7,
		sort: 'modelLikes',
		direction: 'DESC',
		search: {},
	},
};

export default TopModels;
