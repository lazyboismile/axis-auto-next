import { useMutation, useQuery } from '@apollo/client';
import {
    Button,
    FormControl, FormControlLabel, InputLabel,
    MenuItem,
    Select,
    Stack, Switch, TextField,
    Typography
} from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { UPDATE_NOTICE_BY_ADMIN } from '../../../apollo/admin/mutation';
import { CREATE_NOTICE } from '../../../apollo/user/mutation';
import { GET_NOTICE } from '../../../apollo/user/query';
import { getJwtToken } from '../../../libs/auth';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { NoticeCategory, NoticeStatus } from '../../../libs/enums/notice.enum';
import useDeviceDetect from '../../../libs/hooks/useDeviceDetect';
import { sweetErrorHandling, sweetMixinSuccessAlert } from '../../../libs/sweetAlert';
import { Notice } from '../../../libs/types/notice/notice';
import { NoticeUpdate } from '../../../libs/types/notice/notice.update';

const defaultValues: NoticeUpdate = {
	_id: '',
	noticeCategory: '' as NoticeCategory,
	noticeStatus: '' as NoticeStatus,
	noticeTitle: '',
	noticeContent: '',
	event: false,
};

const AddNotice: NextPage = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const rawId = router.query.id;
	const id = typeof rawId === 'string' ? rawId : '';
	const token = getJwtToken();

	const [mode, setMode] = useState<'create' | 'update'>('create');
	const [updateData, setUpdateData] = useState<NoticeUpdate>(defaultValues);

	const [createNotice] = useMutation(CREATE_NOTICE);
	const [updateNotice] = useMutation(UPDATE_NOTICE_BY_ADMIN);

	const {
		loading: getNoticeLoading,
		data: getNoticeData,
		error: getNoticeError,
		refetch: getNoticeRefetch,
	} = useQuery(GET_NOTICE, {
		fetchPolicy: 'network-only',
		variables: { input: id },
		notifyOnNetworkStatusChange: true,
		skip: !id,
	});

	useEffect(() => {
		if (getNoticeData?.getNotice) {
			const existingNotice: Notice = getNoticeData.getNotice;

			console.log('Fetched Notice:', existingNotice);

			setUpdateData({
				_id: existingNotice._id,
				noticeCategory: existingNotice.noticeCategory ?? '',
				noticeStatus: existingNotice.noticeStatus ?? '',
				noticeTitle: existingNotice.noticeTitle ?? '',
				noticeContent: existingNotice.noticeContent ?? '',
				event: !!existingNotice.event, 
			});
			setMode('update');
		}
	}, [getNoticeData, id]);

	const handleSubmit = useCallback(async () => {
		try {
			if (mode === 'update' && updateData._id) {
				await updateNotice({
					variables: {
						memberId: token?.userId,
						input: updateData,
					},
				});
				await sweetMixinSuccessAlert('Notice updated successfully!');
			} else {
				await createNotice({
					variables: {
						input: {
							noticeCategory: updateData.noticeCategory,
							noticeStatus: updateData.noticeStatus,
							noticeTitle: updateData.noticeTitle,
							noticeContent: updateData.noticeContent,
							event: !!updateData.event,
						},
					},
				});
				await sweetMixinSuccessAlert('Notice created successfully!');
				setUpdateData(defaultValues);
			}
		} catch (err: any) {
			sweetErrorHandling(err);
		}
	}, [updateData, mode, token]);

	const doDisabledCheck = () => {
		return (
			!updateData.noticeCategory ||
			!updateData.noticeStatus ||
			!updateData.noticeTitle ||
			!updateData.noticeContent
		);
	};

	if (device === 'mobile') {
		return <>MY PROFILE PAGE MOBILE</>;
	}

	if (getNoticeLoading || (mode === 'update' && !updateData._id)) {
		return <Typography>Loading Notice data...</Typography>;
	}

	return (
		<div id="my-profile-page">
			<Stack className="main-title-box">
				<Stack className="right-box">
					<Typography className="main-title">
						{mode === 'update' ? 'Update Notice' : 'Create Notice'}
					</Typography>
					<Typography className="sub-title">Manage site notices easily.</Typography>
				</Stack>
			</Stack>

			<Stack className="top-box">
				<Stack className="small-input-box">
					{/* Category */}
					<Stack className="input-box">
						<Typography className="title">Category</Typography>
						<FormControl fullWidth>
							<InputLabel>Category</InputLabel>
							<Select
								value={updateData.noticeCategory || ''}
								onChange={(e) =>
									setUpdateData({ ...updateData, noticeCategory: e.target.value as NoticeCategory })
								}
								label="Category"
							>
								{Object.entries(NoticeCategory).map(([key, value]) => (
									<MenuItem key={key} value={value}>
										{value}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>

					{/* Status */}
					<Stack className="input-box">
						<Typography className="title">Status</Typography>
						<FormControl fullWidth>
							<InputLabel>Status</InputLabel>
							<Select
								value={updateData.noticeStatus || 'ACTIVE'}
								onChange={(e) =>
									setUpdateData({ ...updateData, noticeStatus: e.target.value as NoticeStatus })
								}
								label="Status"
							>
								{Object.entries(NoticeStatus).map(([key, value]) => (
									<MenuItem key={key} value={value}>
										{value}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>
				</Stack>

				{/* Title */}
				<Stack className="input-box">
					<Typography className="title">Title</Typography>
					<TextField
						placeholder="Notice Title"
						value={updateData.noticeTitle}
						onChange={({ target: { value } }) =>
							setUpdateData({ ...updateData, noticeTitle: value })
						}
					/>
				</Stack>

				{/* Content */}
				<Stack className="address-box">
					<Typography className="title">Content</Typography>
					<TextField
						placeholder="Notice Content"
						value={updateData.noticeContent}
						onChange={({ target: { value } }) =>
							setUpdateData({ ...updateData, noticeContent: value })
						}
					/>
				</Stack>

				{/* Event toggle */}
				<Stack className="input-box">
					<Typography className="title">Event</Typography>
					<FormControlLabel
						control={
							<Switch
								checked={!!updateData.event}
								onChange={(e) =>
									setUpdateData({ ...updateData, event: e.target.checked })
								}
								color="primary"
							/>
						}
						label={updateData.event ? 'Yes (Event Notice)' : 'No'}
					/>
				</Stack>

				{/* Submit */}
				<Stack className="about-me-box">
					<Button className="update-button" onClick={handleSubmit} disabled={doDisabledCheck()}>
						<Typography>{mode === 'update' ? 'Update Notice' : 'Create Notice'}</Typography>
					</Button>
				</Stack>
			</Stack>
		</div>
	);
};

export default withAdminLayout(AddNotice);
