import { useReactiveVar } from '@apollo/client';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Divider, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { userVar } from '../../../apollo/store';
import useDeviceDetect from '../../hooks/useDeviceDetect';

// interface PopularModelCardProps {
// 	model: Model;
// }

const PopularModelCard = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/

	if (device === 'mobile') {
		return (
			<Stack className="popular-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{
						backgroundImage: `url("/img/banner/aboutBanner.svg")`,
					}}
				>
						<div className={'status'}>
							<span>Great Price</span>
						</div>

						<div className="view-like-box">
							<IconButton color={'inherit'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">120</Typography>
						</div>
						<Divider sx={{ mt: '15px', mb: '17px', background: '#585353' }} />
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>T-Cross – 2023</strong>
					<p className={'desc'}>4.0 D5 PowerPulse Momentum 5dr AW…
					Geartronic Estate</p>
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
					<Divider sx={{ mt: '15px', mb: '17px', background: '#585353' }} />
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
	} else {
		return (
			<Stack className="popular-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{
                    backgroundImage: `url("/img/banner/aboutBanner.svg")`,
                    }}
				>
						<div className={'status'}>
							<span>Great Price</span>
						</div>

						<div className="view-like-box">
							<IconButton color={'inherit'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">120</Typography>
						</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>T-Cross – 2023</strong>
					<p className={'desc'}>4.0 D5 PowerPulse Momentum 5dr AW…
					Geartronic Estate</p>
					<Divider sx={{ mt: '15px', mb: '17px', background: '#585353' }} />
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
					<Divider sx={{ mt: '15px', mb: '17px', background: '#585353' }} />
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

export default PopularModelCard;
