import {
	Button,
	Fade,
	Menu,
	MenuItem,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';
import React from 'react';
//@ts-ignore
import { Faq } from '../../types/faq/faq';

interface FaqArticlesPanelListType {
  dense?: boolean;
  faqs: Faq[];
  anchorEl: (HTMLElement | null)[];
  handleMenuIconClick: (event: React.MouseEvent<HTMLElement>, index: number) => void;
  handleMenuIconClose: () => void;
  updateFaqHandler: (_id: string, faqStatus: string) => void;
}


const headCells = [
	{ id: 'category', label: 'CATEGORY', numeric: true },
	{ id: 'title', label: 'TITLE', numeric: true },
	{ id: 'writer', label: 'WRITER', numeric: true },
	{ id: 'date', label: 'DATE', numeric: true },
	{ id: 'status', label: 'STATUS', numeric: false },
];

export const FaqArticlesPanelList = (props: FaqArticlesPanelListType) => {
	const {
	dense,
	faqs,
	anchorEl = [],
	handleMenuIconClick,
	handleMenuIconClose,
	updateFaqHandler,
} = props;


	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
					<TableHead>
						<TableRow>
							{headCells.map((headCell) => (
								<TableCell
									key={headCell.id}
									align={headCell.numeric ? 'left' : 'center'}
								>
									{headCell.label}
								</TableCell>
							))}
							<TableCell align="left">EMAIL</TableCell>
							<TableCell align="center">USER TYPE</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{faqs && faqs.length > 0 ? (
							faqs.map((faq, index) => (
								<TableRow hover key={faq._id ?? index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align="left">{faq.faqCategory}</TableCell>
									<TableCell align="left">{faq.subject}</TableCell>
									<TableCell align="left">{faq.writerData?.memberNick ?? 'N/A'}</TableCell>
									<TableCell align="left">{new Date(faq.createdAt).toLocaleDateString()}</TableCell>
									<TableCell align="center">
										<Button className={`badge ${faq.answer ? 'success' : 'pending'}`}>
											{faq.answer ? 'Answered' : 'Pending'}
										</Button>
									</TableCell>
									<TableCell align="left">{faq.writerData?.memberEmail ?? '-'}</TableCell>
									<TableCell align="center">
										<Button onClick={(e) => handleMenuIconClick(e, index)} className={'badge success'}>
											{faq?.faqStatus ?? 'Blocked'}
										</Button>
										<Menu
										className="menu-modal"
										MenuListProps={{ 'aria-labelledby': 'fade-button' }}
										anchorEl={anchorEl[index]}
										open={Boolean(anchorEl[index])}
										onClose={handleMenuIconClose}
										TransitionComponent={Fade}
										>
										<MenuItem onClick={() => updateFaqHandler(faq._id, 'ACTIVE')}>
											<Typography variant="subtitle1">ACTIVE</Typography>
										</MenuItem>
										<MenuItem onClick={() => updateFaqHandler(faq._id, 'BLOCKED')}>
											<Typography variant="subtitle1">BLOCK</Typography>
										</MenuItem>
										</Menu>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={8} align="center">
									No FAQs found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
