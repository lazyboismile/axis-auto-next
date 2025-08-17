import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Member } from '../../types/member/member';
import TopAgentCard from './TopAgentCard';

// interface TopAgentsProps {
// 	initialInput: AgentsInquiry;
// }

const TopAgents = ({ initialInput = [], ...props }: any) => { // props: TopAgentsProps
	// const { initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [topAgents, setTopAgents] = useState<Member[]>(
        initialInput.length ? initialInput : [1, 2, 3, 4, 5, 6, 7]
    );

	/** APOLLO REQUESTS **/
	/** HANDLERS **/

	if (device === 'mobile') {
		return (
			<Stack className={'top-agents'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Top Agents</span>
					</Stack>
					<Stack className={'wrapper'}>
						<Swiper
							className={'top-agents-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={29}
							modules={[Autoplay]}
						>
							{topAgents.map((agent, index) => {
								return (
									<SwiperSlide className={'top-agents-slide'} key={index}>
										<TopAgentCard />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'top-agents'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Top Agents</span>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'more-box'}>
								<span>See All Agents</span>
								<img src="/img/icons/rightup.svg" alt="" />
							</div>
						</Box>
					</Stack>
					<Stack className={'wrapper'}>
						<Box component={'div'} className={'switch-btn swiper-agents-prev'}>
							<ArrowBackIosNewIcon />
						</Box>
						<Box component={'div'} className={'card-wrapper'}>
							<Swiper
								className={'top-agents-swiper'}
								slidesPerView={'auto'}
								spaceBetween={29}
								modules={[Autoplay, Navigation, Pagination]}
								navigation={{
									nextEl: '.swiper-agents-next',
									prevEl: '.swiper-agents-prev',
								}}
							>
								{topAgents.map((agent, index) => {
                                    return (
                                        <SwiperSlide className={'top-agents-slide'} key={index}>
                                            <TopAgentCard />
                                        </SwiperSlide>
                                    );
                                })}
							</Swiper>
						</Box>
						<Box component={'div'} className={'switch-btn swiper-agents-next'}>
							<ArrowBackIosNewIcon />
						</Box>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TopAgents.defaultProps = {
	initialInput: {
		page: 1,
		limit: 10,
		sort: 'memberRank',
		direction: 'DESC',
		search: {},
	},
};

export default TopAgents;
