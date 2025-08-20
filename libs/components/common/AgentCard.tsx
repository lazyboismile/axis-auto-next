import { useReactiveVar } from '@apollo/client';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import React from 'react';
import { userVar } from '../../../apollo/store';
import useDeviceDetect from '../../hooks/useDeviceDetect';

// interface AgentCardProps {
// 	agent: any;
// }

const AgentCard = () => { //props: AgentCardProps
	// const { agent } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	// const imagePath: string = agent?.memberImage
	// 	? `${REACT_APP_API_URL}/${agent?.memberImage}`
	// 	: '/img/profile/defaultUser.svg';

	const imagePath: string = '/img/profile/defaultUser.svg';

	if (device === 'mobile') {
		return <div>AGENT CARD</div>;
	} else {
		return (
			<Stack className="agent-general-card">
				<Link
					href={{
						pathname: '/agent/detail',
						// query: { agentId: agent?._id },
					}}
				>
					<Box
						component={'div'}
						className={'agent-img'}
						style={{
							backgroundImage: `url(${imagePath})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
						}}
					>
						{/* <div>{agent?.memberProperties} properties</div> */}
						<div>Models</div>
					</Box>
				</Link>

				<Stack className={'agent-desc'}>
					<Box component={'div'} className={'agent-info'}>
						<Link
							href={{
								pathname: '/agent/detail',
								query: { agentId: 'id' },
							}}
						>
							{/* <strong>{agent?.memberFullName ?? agent?.memberNick}</strong> */}
							<strong>Tony</strong>
						</Link>
						<span>Agent</span>
					</Box>
					<Box component={'div'} className={'buttons'}>
						<IconButton color={'default'}>
							<RemoveRedEyeIcon />
						</IconButton>
						{/* <Typography className="view-cnt">{agent?.memberViews}</Typography> */}
						<Typography className="view-cnt">20</Typography>
						{/* <IconButton color={'default'}>
							{agent?.meLiked && agent?.meLiked[0]?.myFavorite ? (
								<FavoriteIcon color={'primary'} />
							) : (
								<FavoriteBorderIcon />
							)}
						</IconButton> */}
						{/* <Typography className="view-cnt">{agent?.memberLikes}</Typography> */}
						<Typography className="view-cnt">23</Typography>
					</Box>
				</Stack>
			</Stack>
		);
	}
};

export default AgentCard;
