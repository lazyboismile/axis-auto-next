import { Box, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const HeaderFilter = () => {
    const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common')

    if (device === 'mobile') {
		return <div>HEADER FILTER MOBILE</div>;
	} else {
        return (
            <>
                <Stack className={"search-box"}>
                    <Stack className={"select-title"}>
                        <Box component={"div"} className={"title"}>
                            <span>Select a Body Style</span>
                        </Box>
                    </Stack>
                    <Stack className={"search-box-options"}>
                        <Box className={"advanced-filter"}>
                            <img src="/img/banner/types/sedan.svg" alt="Sedan" />
                            <span>Sedan</span>
                        </Box>
                        <Box className={"advanced-filter"}>
                            <img src="/img/banner/types/coupe.svg" alt="Coupe" />
                            <span>Coupe</span>
                        </Box>
                        <Box className={"advanced-filter"}>
                            <img src="/img/banner/types/suv.svg" alt="SUV" />
                            <span>SUV</span>
                        </Box>
                        <Box className={"advanced-filter"}>
                            <img src="/img/banner/types/truck.svg" alt="Truck" />
                            <span>Truck</span>
                        </Box>
                        <Box className={"advanced-filter"}>
                            <img src="/img/banner/types/hat.svg" alt="Hatchback" />
                            <span>Hatchback</span>
                        </Box>
                        <Box className={"advanced-filter"}>
                            <img src="/img/banner/types/mini.svg" alt="Convertible" />
                            <span>Convertible</span>
                        </Box>

                    </Stack>
                </Stack>
            </>
        )
    }
}

export default HeaderFilter