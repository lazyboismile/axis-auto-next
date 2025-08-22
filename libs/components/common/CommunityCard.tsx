import { useReactiveVar } from '@apollo/client';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import React from 'react';
import Moment from 'react-moment';
import { userVar } from '../../../apollo/store';
import { REACT_APP_API_URL } from '../../config';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { BoardArticle } from '../../types/board-article/board-article';

interface CommunityCardProps {
	boardArticle: BoardArticle;
	size?: string;
}

const CommunityCard = (props: CommunityCardProps) => {
	const { boardArticle, size = 'normal' } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const imagePath: string = boardArticle?.articleImage
		? `${REACT_APP_API_URL}/${boardArticle?.articleImage}`
		: '/img/community/communityImg.jpg';

	/** HANDLERS **/
	const chooseArticleHandler = (e: React.SyntheticEvent, boardArticle: BoardArticle) => {
		router.push(
			{
				pathname: '/community/detail',
				query: { articleCategory: boardArticle?.articleCategory, id: boardArticle?._id },
			},
			undefined,
			{ shallow: true },
		);
	};

	const goMemberPage = (id: string) => {
		if (id === user?._id) router.push('/mypage');
		else router.push(`/member?memberId=${id}`);
	};

	if (device === 'mobile') {
		return <div>COMMUNITY CARD MOBILE</div>;
	} else {
		return (
			<Stack
				sx={{ width: size === 'small' ? '285px' : '317px' }}
				className="community-general-card-config"
				onClick={(e) => chooseArticleHandler(e, boardArticle)}
			>
				<Stack className="image-box">
					<img src={imagePath} alt="" className="card-img" />
				</Stack>
				<Stack className="desc-box" sx={{ marginTop: '-20px' }}>
					<Stack>
						<Typography
							className="desc"
							onClick={(e) => {
								e.stopPropagation();
								goMemberPage(boardArticle?.memberData?._id as string);
							}}
						>
							{boardArticle?.memberData?.memberNick}
						</Typography>
						<Typography className="title">{boardArticle?.articleTitle}</Typography>
					</Stack>
					<Stack className={'buttons'}>
						<IconButton color={'default'}>
							<RemoveRedEyeIcon />
						</IconButton>
						<Typography className="view-cnt">{boardArticle?.articleViews}</Typography>
						<IconButton color={'default'}>
							{boardArticle?.meLiked && boardArticle?.meLiked[0]?.myFavorite ? (
								<FavoriteIcon color={'primary'} />
							) : (
								<FavoriteBorderIcon />
							)}
						</IconButton>
						<Typography className="view-cnt">{boardArticle?.articleLikes}</Typography>
					</Stack>
				</Stack>
				<Stack className="date-box">
					<Moment className="month" format={'MMMM'}>
						{boardArticle?.createdAt}
					</Moment>
					<Typography className="day">
						<Moment format={'DD'}>{boardArticle?.createdAt}</Moment>
					</Typography>
				</Stack>
			</Stack>
		);
	}
};

export default CommunityCard;
