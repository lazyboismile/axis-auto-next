import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import PopularModelCard from './PopularModelCard';
// import PopularPropertyCard from './PopularPropertyCard';

// interface PopularModelsProps {
// 	initialInput: ModelsInquiry;
// }

const PopularModels = ({ initialInput = [], ...props }: any) => {
	// const { initialInput } = props;
	const device = useDeviceDetect();
	const [popularModels, setPopularModels] = useState<number[]>(
		initialInput.length ? initialInput : [1, 2, 3, 4, 5, 6, 7]
	);

	/** APOLLO REQUESTS **/
	/** HANDLERS **/


	if (device === 'mobile') {
		return (
			<Stack className={'popular-models'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>The Most Searched Cars</span>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'popular-model-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={25}
							modules={[Autoplay]}
						>
							{popularModels.length === 0 ? (
								<p>No popular properties to show</p>
								) : (
								popularModels.map((model, index) => (
									<SwiperSlide key={index} className="popular-model-slide">
										<PopularModelCard />
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
			<Stack className={'popular-models'}>
				<Stack className={'container'}>
					<Stack className={'card-box-title'}>
						<Box component={'div'} className={'title'}>
							<p>The Most Searched Cars</p>
						</Box>
                        <Box component={'div'} className={'title-search'}>
							<p>Sedan</p>
							<p>SUV</p>
							<p>Convertible</p>
							<p>Hatback</p>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'popular-model-swiper'}
							slidesPerView={'auto'}
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
							{popularModels.length === 0 ? (
								<p>No popular properties to show</p>
								) : (
								popularModels.map((model, index) => (
									<SwiperSlide key={index} className="popular-model-slide">
										<PopularModelCard />
									</SwiperSlide>
								))
							)}
						</Swiper>
					</Stack>
					<Stack className={'pagination-box'}>
						<WestIcon className={'swiper-popular-prev'} />
						<div className={'swiper-popular-pagination'}></div>
						<EastIcon className={'swiper-popular-next'} />
					</Stack>
				</Stack>
			</Stack>
		);
	}
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
