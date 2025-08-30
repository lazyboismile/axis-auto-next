import { useMutation } from '@apollo/client';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CREATE_FAQ } from '../../../apollo/user/mutation';
import { FaqCategory } from '../../enums/faq.enum';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { FaqsInquiry } from '../../types/faq/faq.input';

const Inquiry = () => {
	const device = useDeviceDetect();
	const [category, setCategory] = useState<FaqCategory>();
	const [subject, setSubject] = useState<string>('');
  	const [faqsInquiry, setFaqsInquiry] = useState<FaqsInquiry>(defaultInput);
	const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

	/** APOLLO REQUESTS **/
	const [createFaq, { loading: creating, error: createError }] = useMutation(CREATE_FAQ);
	/** LIFECYCLES **/
	/** HANDLERS **/

	const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();
		if (!category || !subject) return;

		try {
			await createFaq({
			variables: {
				input: {
					faqCategory: category,
					subject,
				},
			},
			});
			setSubmissionSuccess(true);
			await sweetTopSmallSuccessAlert("successfully created", 800)
			setSubject('');
			setCategory(undefined);
		} catch (err) {
			console.error(err);
		}
	};

	if (device === 'mobile') {
		return <div>Inquiry MOBILE</div>;
	} else {
		return <div>
			<Box className={'inquiry-list'}>
				<Typography className={'no-message'}>
					Do you have any questions?
				</Typography>
				{submissionSuccess && (
				<Typography color="success.main">
					Your question has been submitted! You’ll find the answer in the CS list after an admin responds.
				</Typography>
				)}
				{createError && <Typography color="error">Error: {createError.message}</Typography>}
				<form onSubmit={handleSubmit} className={'q-form'}>
					<Stack className={'category'} mt={'30px'}>
						<FormControl className={'input'}>
							<InputLabel>Category</InputLabel>
							<Select
								value={category || ''}
								onChange={(e) => setCategory(e.target.value as FaqCategory)}
								label="Category"
								variant="outlined"
							>
								<MenuItem value="OTHER">Select a category</MenuItem>
								{Object.entries(FaqCategory).map(([key, value]) => (
								<MenuItem key={key} value={value}>
									{key.charAt(0) + key.slice(1)}
								</MenuItem>
								))}
							</Select>
						</FormControl >
						<TextField
							label="Question"
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
							required
							className={'question'}
							variant="outlined"
						/>
						<Button className='badge-btn' type="submit" disabled={creating}>
							{creating ? 'Sending...' : 'Send'}
						</Button>
					</Stack>
				</form>
			</Box>
		</div>;
	}
};

const defaultInput: FaqsInquiry = {
  page: 1,
  limit: 5,
  sort: 'createdAt', //@ts-ignore
  direction: 'DESC',
  search: { //@ts-ignore
    faqCategory: '',
  },
};


export default Inquiry;
