import { Box, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const HeaderFilter = () => {
  const device = useDeviceDetect();
  const { t } = useTranslation('common');

  const typeUrl = (type: string) => {
    const query = {
      page: 1,
      limit: 9,
      sort: "createdAt",
      direction: "DESC",
      search: {
        periodsRange: { start: 1900, end: 2025 },
        pricesRange: { start: 0, end: 20000000 },
        typeList: [type]
      }
    };
    return `/model?input=${encodeURIComponent(JSON.stringify(query))}`;
  };

  if (device === 'mobile') {
    return <div>HEADER FILTER MOBILE</div>;
  }

  return (
    <Stack className="search-box">
      <Stack className="select-title">
        <Box component="div" className="title">
          <span>Select a Body Style</span>
        </Box>
      </Stack>

      <Stack className="search-box-options">
        <Link href={typeUrl("SEDAN")}>
          <Box className="advanced-filter">
            <img src="/img/banner/types/sedan.svg" alt="Sedan" />
            <span>Sedan</span>
          </Box>
        </Link>

        <Link href={typeUrl("COUPE")}>
          <Box className="advanced-filter">
            <img src="/img/banner/types/coupe.svg" alt="Coupe" />
            <span>Coupe</span>
          </Box>
        </Link>

        <Link href={typeUrl("SUV")}>
          <Box className="advanced-filter">
            <img src="/img/banner/types/suv.svg" alt="SUV" />
            <span>SUV</span>
          </Box>
        </Link>

        <Link href={typeUrl("TRUCK")}>
          <Box className="advanced-filter">
            <img src="/img/banner/types/truck.svg" alt="Truck" />
            <span>Truck</span>
          </Box>
        </Link>

        <Link href={typeUrl("HATCHBACK")}>
          <Box className="advanced-filter">
            <img src="/img/banner/types/hat.svg" alt="Hatchback" />
            <span>Hatchback</span>
          </Box>
        </Link>

        <Link href={typeUrl("CONVERTIBLE")}>
          <Box className="advanced-filter">
            <img src="/img/banner/types/mini.svg" alt="Convertible" />
            <span>Convertible</span>
          </Box>
        </Link>
      </Stack>
    </Stack>
  );
};

export default HeaderFilter;
