import { useMutation, useQuery } from '@apollo/client';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography
} from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { UPDATE_FAQ_BY_ADMIN } from '../../../apollo/admin/mutation';
import { CREATE_FAQ } from '../../../apollo/user/mutation';
import { GET_FAQ } from '../../../apollo/user/query';
import { getJwtToken } from '../../../libs/auth';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { FaqCategory } from '../../../libs/enums/faq.enum';
import useDeviceDetect from '../../../libs/hooks/useDeviceDetect';
import { sweetErrorHandling, sweetMixinSuccessAlert } from '../../../libs/sweetAlert';
import { Faq } from '../../../libs/types/faq/faq';
import { FaqUpdate } from '../../../libs/types/faq/faq.update';

const defaultValues: FaqUpdate = {
	_id: '',
	faqCategory: '' as FaqCategory,
	subject: '',
	content: '',
};

const AddFaq: NextPage = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const rawId = router.query.id;
	const id = typeof rawId === 'string' ? rawId : '';
	const token = getJwtToken();

	const [mode, setMode] = useState<'create' | 'update'>('create');
	const [updateData, setUpdateData] = useState<FaqUpdate>(defaultValues);

	const [createFaq] = useMutation(CREATE_FAQ);
	const [updateFaq] = useMutation(UPDATE_FAQ_BY_ADMIN);

	const {
		loading: getFaqLoading,
		data: getFaqData,
	} = useQuery(GET_FAQ, {
		variables: { input: id },
		skip: !id,
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true,
	});

	// Load FAQ data once it's fetched
	useEffect(() => {
		if (getFaqData?.getFaq) {
  			const existingFaq: Faq = getFaqData.getFaq;


			// Debugging: check if data arrives
			console.log('Fetched FAQ:', existingFaq);

			setUpdateData({
				_id: existingFaq._id,
				faqCategory: existingFaq.faqCategory ?? '',
				subject: existingFaq.subject ?? '',
				content: existingFaq.content ?? '',
			});
			setMode('update');
		}
	}, [getFaqData, id]);

	const handleSubmit = useCallback(async () => {
		try {
			if (mode === 'update' && updateData._id) {
				await updateFaq({
					variables: {
						memberId: token?.userId,
						input: updateData,
					},
				});
				await sweetMixinSuccessAlert('FAQ updated successfully!');
			} else {
				await createFaq({
					variables: {
						input: {
							faqCategory: updateData.faqCategory,
							subject: updateData.subject,
							content: updateData.content,
						},
					},
				});
				await sweetMixinSuccessAlert('FAQ created successfully!');
				setUpdateData(defaultValues);
			}
		} catch (err: any) {
			sweetErrorHandling(err);
		}
	}, [updateData, mode, token]);

	const doDisabledCheck = () => {
		return !updateData.faqCategory || !updateData.subject || !updateData.content;
	};

	// Mobile placeholder
	if (device === 'mobile') {
		return <>MY PROFILE PAGE MOBILE</>;
	}

	// Wait until data is loaded
	if (getFaqLoading || (mode === 'update' && !updateData._id)) {
		return <Typography>Loading FAQ data...</Typography>;
	}

	return (
		<div id="my-profile-page">
			<Stack className="main-title-box">
				<Stack className="right-box">
					<Typography className="main-title">
						{mode === 'update' ? 'Answer FAQ' : 'Create FAQ'}
					</Typography>
					<Typography className="sub-title">We are glad to see you again!</Typography>
				</Stack>
			</Stack>

			<Stack className="top-box">
				<Stack className="small-input-box">
					<Stack className="input-box">
						<Typography className="title">Category</Typography>
						<FormControl fullWidth>
							<InputLabel>Category</InputLabel>
							<Select
								value={updateData.faqCategory || ''}
								onChange={(e) =>
									setUpdateData({ ...updateData, faqCategory: e.target.value as FaqCategory })
								}
								label="Category"
							>
								<MenuItem value="">Select a category</MenuItem>
								{Object.entries(FaqCategory).map(([key, value]) => (
									<MenuItem key={key} value={value}>
										{value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>

					<Stack className="input-box">
						<Typography className="title">Subject</Typography>
						<TextField
							placeholder="Subject"
							value={updateData.subject}
							onChange={({ target: { value } }) =>
								setUpdateData({ ...updateData, subject: value })
							}
						/>
					</Stack>
				</Stack>

				<Stack className="address-box">
					<Typography className="title">Content</Typography>
					<TextField
						placeholder="Content"
						value={updateData.content}
						onChange={({ target: { value } }) =>
							setUpdateData({ ...updateData, content: value })
						}
					/>
				</Stack>

				<Stack className="about-me-box">
					<Button className="update-button" onClick={handleSubmit} disabled={doDisabledCheck()}>
						<Typography>{mode === 'update' ? 'Submit Answer' : 'Create FAQ'}</Typography>
						<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
							<g clipPath="url(#clip0_7065_6985)">
								<path
									d="M12.6389 0H4.69446C4.49486 0 4.33334 0.161518 4.33334 0.361122C4.33334 0.560727 4.49486 0.722245 4.69446 0.722245H11.7672L0.105803 12.3836C-0.0352676 12.5247 -0.0352676 12.7532 0.105803 12.8942C0.176321 12.9647 0.268743 13 0.361131 13C0.453519 13 0.545907 12.9647 0.616459 12.8942L12.2778 1.23287V8.30558C12.2778 8.50518 12.4393 8.6667 12.6389 8.6667C12.8385 8.6667 13 8.50518 13 8.30558V0.361122C13 0.161518 12.8385 0 12.6389 0Z"
									fill="white"
								/>
							</g>
							<defs>
								<clipPath id="clip0_7065_6985">
									<rect width="13" height="13" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</Button>
				</Stack>
			</Stack>
		</div>
	);
};

export default withAdminLayout(AddFaq);
