import { useMutation, useQuery } from '@apollo/client';
import { Pagination, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { LIKE_TARGET_BOARD_ARTICLE } from '../../../apollo/user/mutation';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { Messages } from '../../config';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { BoardArticle } from '../../types/board-article/board-article';
import { BoardArticlesInquiry } from '../../types/board-article/board-article.input';
import { T } from '../../types/common';
import CommunityCard from '../common/CommunityCard';

const MemberArticles: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [total, setTotal] = useState<number>(0);
	const { memberId } = router.query;
	const [searchFilter, setSearchFilter] = useState<BoardArticlesInquiry>(initialInput);
	const [memberBoArticles, setMemberBoArticles] = useState<BoardArticle[]>([]);

	/** APOLLO REQUESTS **/

	const [likeTargetArticle] = useMutation(LIKE_TARGET_BOARD_ARTICLE);

	const {
		loading: getArticlesLoading,
		data: getArticlesData,
		error: getArticlesError,
		refetch: getArticlesRefetch,
	} = useQuery(GET_BOARD_ARTICLES, {
		variables: {
			input: searchFilter,
		},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setMemberBoArticles(data?.getBoardArticles?.list);
			setTotal(data?.getBoardArticles?.metaCounter[0]?.total ?? 0);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (memberId) setSearchFilter({ ...initialInput, search: { memberId: memberId } });
	}, [memberId]);

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	const likeArticleHandler = async (e: any, user: any, id: string) => {
		try {
			e.stopPropagation();
			if(!id) return;
			if(!user._id) throw new Error(Messages.error2);


			// execute likeTargetBoardArticle Mutuation
			await  likeTargetArticle({
				variables: {input: id},
			});

			// execute getBoardArticleRefetch
			await getArticlesRefetch({ input: searchFilter });
			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log("ERROR, likeTargetArticle: ", err.message);
			sweetMixinErrorAlert(err.message).then();
		} 
	}

	if (device === 'mobile') {
		return <div>MEMBER ARTICLES MOBILE</div>;
	} else {
		return (
			<div id="member-articles-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">Articles</Typography>
					</Stack>
				</Stack>
				<Stack className="articles-list-box">
					{memberBoArticles?.length === 0 && (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>No Articles found!</p>
						</div>
					)}
					{memberBoArticles?.map((boardArticle: BoardArticle) => {
						return <CommunityCard boardArticle={boardArticle} likeArticleHandler={likeArticleHandler} key={boardArticle?._id} size={'small'} />;
					})}
				</Stack>
				{memberBoArticles?.length !== 0 && (
					<Stack className="pagination-config">
						<Stack className="pagination-box">
							<Pagination
								count={Math.ceil(total / searchFilter.limit) || 1}
								page={searchFilter.page}
								shape="circular"
								sx={{
									'& .MuiPaginationItem-root': {
										color: '#405FF2',
									},
									'& .MuiPaginationItem-root.Mui-selected': {
										backgroundColor: '#405FF2',
										color: '#fff',
									},
									'& .MuiPaginationItem-root.Mui-selected:hover': {
										backgroundColor: '#3249c7',
									},
								}}
								onChange={paginationHandler}
							/>
						</Stack>
						<Stack className="total-result">
							<Typography>{total} property available</Typography>
						</Stack>
					</Stack>
				)}
			</div>
		);
	}
};

MemberArticles.defaultProps = {
	initialInput: {
		page: 1,
		limit: 6,
		sort: 'createdAt',
		direction: 'DESC',
		search: {},
	},
};

export default MemberArticles;
