import { Stack } from '@mui/material';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import About from '../libs/components/homapage/About';
import Advertisement from '../libs/components/homapage/Advertisement';
import Columns from '../libs/components/homapage/Columns';
import CommunityBoards from '../libs/components/homapage/CommunitBoards';
import Map from '../libs/components/homapage/Map';
import NewModels from '../libs/components/homapage/NewModels';
import PopularModels from '../libs/components/homapage/PopularModels';
import Statistics from '../libs/components/homapage/Statistics';
import TopAgents from '../libs/components/homapage/TopAgents';
import TopModels from '../libs/components/homapage/TopModels';
import withLayoutMain from '../libs/components/layout/LayoutHome';
import useDeviceDetect from '../libs/hooks/useDeviceDetect';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const Home: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return (
			<Stack className={'home-page'}>
				<About />
				<PopularModels />
				<Columns />
				<TopModels />
				<Advertisement />
				<Statistics />
				<NewModels />
				<TopAgents />
				<CommunityBoards />
				<Map />
			</Stack>
		);
	} else {
		return (
			<Stack className={'home-page'}>
				<About />
				<PopularModels />
				<Columns />
				<TopModels />
				<Advertisement />
				<Statistics />
				<NewModels />
				<TopAgents />
				<CommunityBoards />
				<Map />
			</Stack>
		);
	}
};

export default withLayoutMain(Home);
