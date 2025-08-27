import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { Pagination, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { userVar } from '../../../apollo/store';
import { LIKE_TARGET_BOARD_ARTICLE } from '../../../apollo/user/mutation';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { Message } from '../../enums/common.enum';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { BoardArticle } from '../../types/board-article/board-article';
import { T } from '../../types/common';
import CommunityCard from '../common/CommunityCard';

const MyArticles: NextPage = ({ initialInput, ...props }: T) => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const [searchCommunity, setSearchCommunity] = useState({
		...initialInput,
		search: { memberId: user._id },
	});
	const [boardArticles, setBoardArticles] = useState<BoardArticle[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);

	/** APOLLO REQUESTS **/

	const [likeTargetArticle] = useMutation(LIKE_TARGET_BOARD_ARTICLE);

	const {
		loading: getMeArticlesLoading,
		data: getMeArticlesData,
		error: getMeArticlesError,
		refetch: getMeArticlesRefetch,
	} = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: "network-only",
		variables: { input: searchCommunity },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setBoardArticles(data?.getBoardArticles?.list);
			setTotalCount(data?.getBoardArticles?.metaCounter[0]?.total ?? 0);
		}
	});

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchCommunity({ ...searchCommunity, page: value });
	};

	const likeArticleHandler = async (e: any, user: T, id: string) => {
		try {
			e.stopPropagation();
			if(!id) return;
			if(!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			// execute likeTargetArticle Mutuation
			await  likeTargetArticle({
				variables: {input: id},
			});

			// execute getFavoritesRefetch
			await getMeArticlesRefetch({ input: searchCommunity });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log("ERROR, likeArticleHandler: ", err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	}

	if (device === 'mobile') {
		return <>ARTICLE PAGE MOBILE</>;
	} else
		return (
			<div id="my-articles-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">Article</Typography>
						<Typography className="sub-title">We are glad to see you again!</Typography>
					</Stack>
				</Stack>
				<Stack className="article-list-box">
					{boardArticles?.length > 0 ? (
						boardArticles?.map((boardArticle: BoardArticle) => {
							return <CommunityCard boardArticle={boardArticle} key={boardArticle?._id} size={'small'} likeArticleHandler={likeArticleHandler} />;
						})
					) : (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>No Articles found!</p>
						</div>
					)}
				</Stack>

				{boardArticles?.length > 0 && (
					<Stack className="pagination-conf">
						<Stack className="pagination-box">
							<Pagination
								count={Math.ceil(totalCount / searchCommunity.limit)}
								page={searchCommunity.page}
								shape="circular"
								sx={{
									'& .MuiPaginationItem-root': {
									color: '#405FF2', // text color for numbers
									},
									'& .MuiPaginationItem-root.Mui-selected': {
									backgroundColor: '#405FF2', // selected button background
									color: '#fff',              // selected button text
									},
									'& .MuiPaginationItem-root.Mui-selected:hover': {
									backgroundColor: '#3249c7', // darker on hover
									},
								}}
								onChange={paginationHandler}
							/>
						</Stack>
						<Stack className="total">
							<Typography>Total {totalCount ?? 0} article(s) available</Typography>
						</Stack>
					</Stack>
				)}
			</div>
		);
};

MyArticles.defaultProps = {
	initialInput: {
		page: 1,
		limit: 6,
		sort: 'createdAt',
		direction: 'DESC',
		search: {},
	},
};

export default MyArticles;
