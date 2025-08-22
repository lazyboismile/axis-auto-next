import { useReactiveVar } from '@apollo/client';
import { Stack } from '@mui/material';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React from 'react';
import { userVar } from '../../apollo/store';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import MemberFollowers from '../../libs/components/member/MemberFollowers';
import MemberFollowings from '../../libs/components/member/MemberFollowings';
import AddModel from '../../libs/components/mypage/AddNewModel';
import MyArticles from '../../libs/components/mypage/MyArticles';
import MyFavorites from '../../libs/components/mypage/MyFavorites';
import MyMenu from '../../libs/components/mypage/MyMenu';
import MyModels from '../../libs/components/mypage/MyModels';
import MyOrders from '../../libs/components/mypage/MyOrders';
import MyProfile from '../../libs/components/mypage/MyProfile';
import RecentlyVisited from '../../libs/components/mypage/RecentlyVisited';
import WriteArticle from '../../libs/components/mypage/WriteArticle';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { sweetErrorHandling } from '../../libs/sweetAlert';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const MyPage: NextPage = () => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();
	const category: any = router.query?.category ?? 'myProfile';

	/** APOLLO REQUESTS **/

	/** LIFECYCLES **/
	// useEffect(() => {
	// 	if (!user._id) router.push('/').then();
	// }, [user]);

	/** HANDLERS **/
	const subscribeHandler = async (id: string, refetch: any, query: any) => {
		try {
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const unsubscribeHandler = async (id: string, refetch: any, query: any) => {
		try {
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const redirectToMemberPageHandler = async (memberId: string) => {
		try {
			if (memberId === user?._id) await router.push(`/mypage?memberId=${memberId}`);
			else await router.push(`/member?memberId=${memberId}`);
		} catch (error) {
			await sweetErrorHandling(error);
		}
	};

	if (device === 'mobile') {
		return <div>MY PAGE</div>;
	} else {
		return (
			<div id="my-page" style={{ position: 'relative' }}>
				<div className="container">
					<Stack className={'my-page'}>
						<Stack className={'back-frame'}>
							<Stack className={'left-config'}>
								<MyMenu />
							</Stack>
							<Stack className="main-config" mb={'76px'}>
								<Stack className={'list-config'}>
									{category === 'addModel' && <AddModel />}
									{category === 'myModels' && <MyModels />}
									{category === 'myFavorites' && <MyFavorites />}
									{category === 'recentlyVisited' && <RecentlyVisited />}
									{category === 'myOrders' && <MyOrders />}
									{category === 'myArticles' && <MyArticles />}
									{category === 'writeArticle' && <WriteArticle />}
									{category === 'myProfile' && <MyProfile />}
									{category === 'followers' && (
										<MemberFollowers
											subscribeHandler={subscribeHandler}
											unsubscribeHandler={unsubscribeHandler}
											redirectToMemberPageHandler={redirectToMemberPageHandler}
										/>
									)}
									{category === 'followings' && (
										<MemberFollowings
											subscribeHandler={subscribeHandler}
											unsubscribeHandler={unsubscribeHandler}
											redirectToMemberPageHandler={redirectToMemberPageHandler}
										/>
									)}
								</Stack>
							</Stack>
						</Stack>
					</Stack>
				</div>
			</div>
		);
	}
};

export default withLayoutBasic(MyPage);
