import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';

// interface TopAgentProps {
// 	agent: Member;
// } 
const TopAgentCard = () => { //props: TopAgentProps
	// const { agent } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const agentImage = '/img/profile/girl4.jpg';

	/** HANDLERS **/

	if (device === 'mobile') {
		return (
			<Stack className="top-agent-card">
				<img src={agentImage} alt="" />

				<strong>Lisa</strong>
				<span>Agent</span>
			</Stack>
		);
	} else {
		return (
			<Stack className="top-agent-card">
				<img src={agentImage} alt="" />

				<strong>Lisa</strong>
				<span>Agent</span>
			</Stack>
		);
	}
};

export default TopAgentCard;
