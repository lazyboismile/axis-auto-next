import { Box, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Slider from 'react-slick';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const images = [
  '/img/banner/header1.svg',
  '/img/banner/header5.jpg',
  '/img/banner/aboutBanner.jpg'
];

const BannerHeader = () => {
    const device = useDeviceDetect();
    const { t, i18n } = useTranslation('common');
    
    const settings = {
        dots: true,
        infinite: true,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };
        
    if(device === 'mobile') {
        return <div>BannerHeader MOBILE</div>
    } else {
        return ( 
            <>
                <Stack className={'background'}>
                <Slider {...settings}>
                    {images.map((src, index) => (
                    <Box 
                        key={index} 
                        className={"slider"}
                    >
                        <img
                            src={src}
                            alt={`slide-${index}`}
                        />

                        {/* Text Overlay */}
                        <Box className={'slider-title'}>
                        <h3>{t('The World Largest Used Car Dealership')}</h3>
                        <h1>{t('Find Your Perfect Vehicle Online')}</h1>
                        </Box>
                    </Box>
                    ))}
                </Slider>
                </Stack>
            </>
        )
    }
};

export default BannerHeader;
