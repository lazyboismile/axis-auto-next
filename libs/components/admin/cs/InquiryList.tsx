import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface Data {
	category: string;
	qna_case_status: string;
	title: string;
	writer: string;
	subject: string;
	status: string;
	id?: string;
}

type Order = 'asc' | 'desc';

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'category',
		numeric: true,
		disablePadding: false,
		label: 'CATEGORY',
	},
	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'TITLE',
	},
	{
		id: 'writer',
		numeric: true,
		disablePadding: false,
		label: 'WRITER',
	},
	{
		id: 'subject',
		numeric: true,
		disablePadding: false,
		label: 'SUBJECT',
	},
	{
		id: 'qna_case_status',
		numeric: false,
		disablePadding: false,
		label: 'QNA STATUS',
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { onSelectAllClick } = props;

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'left' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface InquiryPanelListType {
	dense?: boolean;
	membersData?: any;
	searchMembers?: any;
	anchorEl?: any;
	handleMenuIconClick?: any;
	handleMenuIconClose?: any;
	generateFaqTypeHandle?: any;
	faqs?: any[];
}

export const InquiryList = (props: InquiryPanelListType) => {
	const {
		faqs = [],
		dense,
		membersData,
		searchMembers,
		anchorEl,
		handleMenuIconClick,
		handleMenuIconClose,
		generateFaqTypeHandle,
	} = props;
	const router = useRouter();

	/** APOLLO REQUESTS **/
	/** LIFECYCLES **/
	/** HANDLERS **/

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{faqs && faqs.length > 0 ? (
							faqs.map((faq: any, index: number) => {
							const member_image = `${faq?.writerData?.memberImage[0]}`;

							return (
								<TableRow hover key={faq._id || index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell align="left">{faq.faqCategory}</TableCell>
								<TableCell align="left">{faq.subject}</TableCell>
								<TableCell align="left" className={'name'}>
									<Stack direction={'row'}>
									<Link href={`/member?memberId=${faq?.writer}`}>
										<div>
										<Avatar alt="User" src={member_image} sx={{ ml: '2px', mr: '10px' }} />
										</div>
									</Link>
									<Link href={`/member?memberId=${faq?.writer}`}>
										<div>{faq.writerData.memberNick}</div>
									</Link>
									</Stack>
								</TableCell>
								<TableCell align="left">{faq.content ?? 'Not answered'}</TableCell>
								<TableCell align="center">
									<Link href={`/admin/cs/addFaq?id=${faq._id}`}>
										<div>Answer</div>
									</Link>
								</TableCell>
								</TableRow>
							);
							})
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
