import { Box, Stack } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';

const About: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>ABOUT PAGE MOBILE</div>;
	} else {
		return (
			<Stack className={'about-page'}>
				{/* Intro Section */}
				<Stack className={'intro'}>
					<Stack className={'container'}>
						<Stack className={'left'}>
							<strong>Driving Innovation in the Car Sales Industry.</strong>
						</Stack>
						<Stack className={'right'}>
							<p>
								Buying your dream car should be simple, secure, and exciting.  
								At <strong>AutoDrive</strong>, we bring transparency, trust, and technology 
								to help you make the right choice every time.
								<br />
								<br />
								From luxury sedans to rugged SUVs, our marketplace connects you with 
								top-quality vehicles backed by expert service and support.
							</p>
							<Stack className={'boxes'}>
								<div className={'box'}>
									<div>
										<img src="/img/icons/investment.svg" alt="" />
									</div>
									<span>Wide Selection</span>
									<p>Thousands of cars from trusted dealers and private sellers.</p>
								</div>
								<div className={'box'}>
									<div>
										<img src="/img/icons/securePayment.svg" alt="" />
									</div>
									<span>Secure Transactions</span>
									<p>Safe and transparent payments with full buyer protection.</p>
								</div>
							</Stack>
						</Stack>
					</Stack>
				</Stack>

				{/* Stats Section */}
				<Stack className={'statistics'}>
					<Stack className={'container'}>
						<Stack className={'banner'}>
							<img src="/img/banner/header8.webp" alt="" />
						</Stack>
						<Stack className={'info'}>
							<Box component={'div'}>
								<strong>50K+</strong>
								<p>Cars Sold</p>
							</Box>
							<Box component={'div'}>
								<strong>15K+</strong>
								<p>Verified Dealers</p>
							</Box>
							<Box component={'div'}>
								<strong>1M+</strong>
								<p>Happy Drivers</p>
							</Box>
						</Stack>
					</Stack>
				</Stack>

				{/* Agents / Dealers */}
				<Stack className={'agents'}>
					<Stack className={'container'}>
						<span className={'title'}>Our Trusted Dealers</span>
						<p className={'desc'}>Partnering with certified experts across the nation</p>
						<Stack className={'wrap'}>
							{/* Dealer cards here */}
						</Stack>
					</Stack>
				</Stack>

				{/* Selling Options */}
				<Stack className={'options'}>
					<img src="/img/banner/aboutBanner.svg" alt="" className={'about-banner'} />
					<Stack className={'container'}>
						<strong>Find the Right Selling Option for Your Car</strong>
						<Stack>
							<div className={'icon-box'}>
								<img src="/img/icons/security.svg" alt="" />
							</div>
							<div className={'text-box'}>
								<span>Car Valuation</span>
								<p>Get instant market value estimates before you sell.</p>
							</div>
						</Stack>
						<Stack>
							<div className={'icon-box'}>
								<img src="/img/icons/keywording.svg" alt="" />
							</div>
							<div className={'text-box'}>
								<span>Smart Marketing</span>
								<p>Your car reaches thousands of buyers instantly.</p>
							</div>
						</Stack>
						<Stack>
							<div className={'icon-box'}>
								<img src="/img/icons/investment.svg" alt="" />
							</div>
							<div className={'text-box'}>
								<span>Best Deals</span>
								<p>We connect you with the highest offers, hassle-free.</p>
							</div>
						</Stack>
						<Stack className={'btn'}>
							Learn More
							<img src="/img/icons/rightup.svg" alt="" />
						</Stack>
					</Stack>
				</Stack>

				{/* Partners */}
				<Stack className={'partners'}>
					<Stack className={'container'}>
						<span>Trusted by Leading Automotive Brands</span>
						<Stack className={'wrap'}>
							<img src="/img/icons/brands/amazon.svg" alt="" />
							<img src="/img/icons/brands/amd.svg" alt="" />
							<img src="/img/icons/brands/cisco.svg" alt="" />
							<img src="/img/icons/brands/dropcam.svg" alt="" />
							<img src="/img/icons/brands/spotify.svg" alt="" />
						</Stack>
					</Stack>
				</Stack>

				{/* Help Section */}
				<Stack className={'help'}>
					<Stack className={'container'}>
						<Box component={'div'} className={'left'}>
							<strong>Need help? Talk to our car experts.</strong>
							<p>Get guidance on buying, selling, or financing your vehicle.</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'white'}>
								Contact Us
								<img src="/img/icons/rightup.svg" alt="" />
							</div>
							<div className={'black'}>
								<img src="/img/icons/call.svg" alt="" />
								1 866 5468 7077
							</div>
						</Box>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withLayoutBasic(About);
