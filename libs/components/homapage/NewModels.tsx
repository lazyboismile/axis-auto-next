import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import NewModelCard from './NewModelCard';

// interface NewModelsProps {
// 	initialInput: ModelsInquiry;
// }

const NewModels = ({ initialInput = [], ...props }: any) => {
	// const { initialInput } = props;
	const device = useDeviceDetect();
	const [newModels, setNewModels] = useState<number[]>(
		initialInput.length ? initialInput : [1, 2, 3, 4, 5, 6, 7]
	);

	/** APOLLO REQUESTS **/
	/** HANDLERS **/


	if (device === 'mobile') {
		return (
			<Stack className={'new-models'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Upcoming Cars</span>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'new-model-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={25}
							modules={[Autoplay]}
						>
							{newModels.length === 0 ? (
								<p>No new properties to show</p>
								) : (
								newModels.map((model, index) => (
									<SwiperSlide key={index} className="new-model-slide">
										<NewModelCard />
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
			<Stack className={'new-models'}>
				<Stack className={'container'}>
					<Stack className={'card-box-title'}>
						<Box component={'div'} className={'title'}>
							<p>Upcoming Cars</p>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
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
							{newModels.length === 0 ? (
								<p>No new properties to show</p>
								) : (
								newModels.map((model, index) => (
									<SwiperSlide key={index} className="new-model-slide">
										<NewModelCard />
									</SwiperSlide>
								))
							)}
						</Swiper>
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
