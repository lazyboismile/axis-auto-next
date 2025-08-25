import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FaqCategory } from '../../enums/faq.enum';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const Inquiry = () => {
	const device = useDeviceDetect();
	const [category, setCategory] = useState<FaqCategory>();
	const [subject, setSubject] = useState<string>('');
	const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

	/** APOLLO REQUESTS **/
	/** LIFECYCLES **/
	/** HANDLERS **/

	const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !subject) {
      alert('Please select a category and enter a question');
      return;
    }
    // await createInquiry({
    //   variables: {
    //     input: {
    //       faqCategory: category,
    //       subject,
    //       // content is not included (admin will add later)
    //     } as InquiryInput,
    //   },
    // });
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
					Question submitted successfully!
				</Typography>
				)}
				{/* {createError && <Typography color="error">Error: {createError.message}</Typography>} */}
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
						<Button type="submit" className={'submit'}>
							send
						</Button>
					</Stack>
				</form>
			</Box>
		</div>;
	}
};

export default Inquiry;
