import { useMutation, useReactiveVar } from '@apollo/client';
import { Stack } from '@mui/material';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { userVar } from '../../apollo/store';
import { LIKE_TARGET_MEMBER, SUBSCRIBE, UNSUBSCRIBE } from '../../apollo/user/mutation';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import MemberArticles from '../../libs/components/member/MemberArticles';
import MemberFollowers from '../../libs/components/member/MemberFollowers';
import MemberFollowings from '../../libs/components/member/MemberFollowings';
import MemberMenu from '../../libs/components/member/MemberMenu';
import MemberModels from '../../libs/components/member/memberModels';
import { Messages } from '../../libs/config';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const MemberPage: NextPage = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const category: any = router.query?.category;
	const user = useReactiveVar(userVar);

	/** APOLLO REQUESTS **/

	const [subscribe] = useMutation(SUBSCRIBE);
	const [unsubscribe] = useMutation(UNSUBSCRIBE);
	const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER);

	/** LIFECYCLES **/
	useEffect(() => {
		if (!router.isReady) return;
		if (!category) {
			router.replace(
				{
					pathname: router.pathname,
					query: { ...router.query, category: 'models' },
				},
				undefined,
				{ shallow: true },
			);
		}
	}, [category, router]);

	/** HANDLERS **/
	const subscribeHandler = async (id: string, refetch: any, query: any) => {
		try {
			if (!id) throw new Error(Messages.error1);
			if (!user._id) throw new Error(Messages.error2);

			await subscribe({
				variables: {
					input: id,
				},
			});

			await sweetTopSmallSuccessAlert('You are now following this member!', 800);
			await refetch({ input: query });
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const unsubscribeHandler = async (id: string, refetch: any, query: any) => {
		try {
			if (!id) throw new Error(Messages.error1);
			if (!user._id) throw new Error(Messages.error2);

			await unsubscribe({
				variables: {
					input: id,
				},
			});

			await sweetTopSmallSuccessAlert('You are no longer following this member!', 800);
			await refetch({ input: query });
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const likeMemberHandler = async (id: string, refetch: any, query: any) => {
		try {
			if (!id) throw new Error(Messages.error1);
			if (!user._id) throw new Error(Messages.error2);

			await likeTargetMember({
				variables: {
					input: id,
				},
			});

			await sweetTopSmallSuccessAlert('Success!', 800);
			await refetch({ input: query });
		} catch (err: any) {
			console.log('ERROR, likeMemberHandler:', err.message);
			sweetErrorHandling(err.message).then();
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
		return <>MEMBER PAGE MOBILE</>;
	} else {
		return (
			<div id="member-page" style={{ position: 'relative' }}>
				<div className="container">
					<Stack className={'member-page'}>
						<Stack className={'back-frame'}>
							<Stack className={'left-config'}>
								<MemberMenu subscribeHandler={subscribeHandler} unsubscribeHandler={unsubscribeHandler} />
							</Stack>
							<Stack className="main-config" mb={'76px'}>
								<Stack className={'list-config'}>
									{category === 'models' && <MemberModels />}
									{category === 'followers' && (
										<MemberFollowers
											subscribeHandler={subscribeHandler}
											unsubscribeHandler={unsubscribeHandler}
											redirectToMemberPageHandler={redirectToMemberPageHandler}
											likeMemberHandler={likeMemberHandler}
										/>
									)}
									{category === 'followings' && (
										<MemberFollowings
											subscribeHandler={subscribeHandler}
											unsubscribeHandler={unsubscribeHandler}
											redirectToMemberPageHandler={redirectToMemberPageHandler}
											likeMemberHandler={likeMemberHandler}
										/>
									)}
									{category === 'articles' && <MemberArticles />}
								</Stack>
							</Stack>
						</Stack>
					</Stack>
				</div>
			</div>
		);
	}
};

export default withLayoutBasic(MemberPage);
