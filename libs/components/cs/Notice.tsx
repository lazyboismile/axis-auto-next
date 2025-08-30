import { useQuery } from '@apollo/client';
import { Box, Stack } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { GET_NOTICES } from '../../../apollo/user/query';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { T } from '../../types/common';
import { Notice } from '../../types/notice/notice';
import { AllNoticesInquiry } from '../../types/notice/notice.input';

interface NoticeProps {
	initialInput: AllNoticesInquiry;
}

const Notice = (props: NoticeProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [notices, setNotices] = useState<Notice[]>([]);

	/** APOLLO REQUESTS **/

	const {
		loading: getNoticesLoading,
		data: getNoticesData,
		error: getNoticesError,
		refetch: getNoticesRefetch,
	} = useQuery(GET_NOTICES, {
		fetchPolicy: "network-only",
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setNotices(data?.getNotices?.list);
		}
	});
	/** LIFECYCLES **/
	/** HANDLERS **/

	// const data = [
	// 	{
	// 		no: 1,
	// 		event: true,
	// 		title: 'Register to use and get discounts',
	// 		date: '01.03.2024',
	// 	},
	// 	{
	// 		no: 2,
	// 		title: "It's absolutely free to upload and trade properties",
	// 		date: '31.03.2024',
	// 	},
	// ];

	if (device === 'mobile') {
		return <div>NOTICE MOBILE</div>;
	} else {
		return (
			<Stack className={'notice-content'}>
				<span className={'title'}>Notice</span>
				<Stack className={'main'}>
					<Box component={'div'} className={'top'}>
						<span>number</span>
						<span>title</span>
						<span>date</span>
					</Box>
					<Stack className={'bottom'}>
					{notices.length > 0 &&
						notices.map((notice: Notice, index: number) => (
						<div
							className={`notice-card ${notice.event ? 'event' : ''}`}
							key={notice._id?.toString() || index}
						>
							{notice.event && <div className="event-label">Event</div>}

							{!notice.event && <span className={'notice-number'}>{index + 1}</span>}

							<span className={'notice-title'}>{notice.noticeTitle}</span>
							<span className={'notice-date'}>
							{notice.createdAt
								? dayjs(
									typeof notice.createdAt === 'string'
									? notice.createdAt
									//@ts-ignore
									: notice.createdAt.$date
								).format('DD MMM YYYY') 
								: '—'}
							</span>

						</div>
						))}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

//@ts-ignore
Notice.defaultProps = {
	initialInput: {
		page: 1,
        limit: 10,
        sort: "createdAt",
        direction: "DESC",
        search: {

		}
	},
};

export default Notice;
