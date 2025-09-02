import { Box, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import SliderLib from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import useDeviceDetect from '../../hooks/useDeviceDetect';

// Fix TypeScript error with react-slick
const Slider: any = SliderLib;

const images: string[] = [
  '/img/banner/header1.svg',
  '/img/banner/header5.jpg',
  '/img/banner/aboutBanner.jpg'
];

const BannerHeader: React.FC = () => {
  const device = useDeviceDetect();
  const { t } = useTranslation('common');

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

  if (device === 'mobile') {
    return (
      <Stack className="background">
        <Box sx={{ textAlign: 'center', py: 5, fontSize: 18 }}>
          {t('BannerHeader MOBILE')}
        </Box>
      </Stack>
    );
  }

  return (
    <Stack className="background">
      <Slider {...settings}>
        {images.map((src, index) => (
          <Box key={index} className="slider" sx={{ position: 'relative' }}>
            <img
              src={src}
              alt={`slide-${index}`}
              style={{ width: '100%', display: 'block' }}
            />
            <Box
              className="slider-title"
              sx={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#fff',
                textAlign: 'center',
              }}
            >
              <h3>{t('The World Largest Used Car Dealership')}</h3>
              <h1>{t('Find Your Perfect Vehicle Online')}</h1>
            </Box>
          </Box>
        ))}
      </Slider>
    </Stack>
  );
};

export default BannerHeader;
