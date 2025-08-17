import { Box } from '@mui/material';
import dayjs from "dayjs";
import Link from 'next/link';
import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { BoardArticle } from '../../types/board-article/board-article';


interface CommunityCardProps {
	vertical: boolean;
	article: BoardArticle;
	index: number;
}

const CommunityCard = (props: CommunityCardProps) => {
	const { vertical, article, index } = props;
	const device = useDeviceDetect();
	const articleImage = '/img/banner/aboutBanner.svg';

	if (device === 'mobile') {
		return <div>COMMUNITY CARD (MOBILE)</div>;
	} else {
		if (vertical) {
			return (
				<Link href={`/community/detail?articleCategory=${article?.articleCategory}&id=${article?._id}`}>
					<Box component={'div'} className={'vertical-card'}>
                        <div
                        className="community-img"
                        style={{ backgroundImage: "url('/img/banner/header4.svg')" }}
                        >
                            <div>1</div>
                        </div>
						<strong>Title</strong>
						<span>Free Board</span>
					</Box>
				</Link>
			);
		} else {
			return (
				<>
					<Link href={`/community/detail?articleCategory=${article?.articleCategory}&id=${article?._id}`}>
						<Box component={'div'} className="horizontal-card">
							<img src={articleImage} alt="" />
							<div>
								<strong>{article.articleTitle}</strong>
								<span>{dayjs("2000-12-12").format("DD.MM.YY")}</span>
							</div>
						</Box>
					</Link>
				</>
			);
		}
	}
};

export default CommunityCard;
