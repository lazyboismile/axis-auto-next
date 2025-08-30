import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {
	Box, Button, Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Tooltip
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NotePencil } from 'phosphor-react';
import React, { useState } from 'react';
import { Notice } from '../../../types/notice/notice';

type Order = 'asc' | 'desc';

interface Data {
	category: string;
	title: string;
	id: string;
	writer: string;
	date: string;
	view: number;
	action: string;
}
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
		label: 'Category',
	},
	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'TITLE',
	},
	{
		id: 'id',
		numeric: true,
		disablePadding: false,
		label: 'ID',
	},
	{
		id: 'writer',
		numeric: true,
		disablePadding: false,
		label: 'WRITER',
	},
	{
		id: 'date',
		numeric: true,
		disablePadding: false,
		label: 'DATE',
	},
	{
		id: 'view',
		numeric: true,
		disablePadding: false,
		label: 'VIEW',
	},
	{
		id: 'action',
		numeric: false,
		disablePadding: false,
		label: 'ACTION',
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

interface EnhancedTableToolbarProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
	const [select, setSelect] = useState('');
	const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

	return (
		<>
			{numSelected > 0 ? (
				<>
					<Toolbar>
						<Box component={'div'}>
							<Box component={'div'} className="flex_box">
								<Checkbox
									color="primary"
									indeterminate={numSelected > 0 && numSelected < rowCount}
									checked={rowCount > 0 && numSelected === rowCount}
									onChange={onSelectAllClick}
									inputProps={{
										'aria-label': 'select all',
									}}
								/>
								<Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="h6" component="div">
									{numSelected} selected
								</Typography>
							</Box>
							<Button variant={'text'} size={'large'}>
								Delete
							</Button>
						</Box>
					</Toolbar>
				</>
			) : (
				<TableHead>
					<TableRow>
						<TableCell padding="checkbox">
							<Checkbox
								color="primary"
								indeterminate={numSelected > 0 && numSelected < rowCount}
								checked={rowCount > 0 && numSelected === rowCount}
								onChange={onSelectAllClick}
								inputProps={{
									'aria-label': 'select all',
								}}
							/>
						</TableCell>
						{headCells.map((headCell) => (
							<TableCell
								key={headCell.id}
								align={headCell.numeric ? 'left' : 'right'}
								padding={headCell.disablePadding ? 'none' : 'normal'}
							>
								{headCell.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
			)}
			{numSelected > 0 ? null : null}
		</>
	);
};

interface NoticeListType {
	dense?: boolean;
	membersData?: any;
	searchMembers?: any;
	anchorEl?: any;
	handleMenuIconClick?: any;
	handleMenuIconClose?: any;
	generateMentorTypeHandle?: any;
	notices?: any[];
	removeNoticeHandler: any;
}

export const NoticeList = (props: NoticeListType) => {
	const {
		notices = [],
		dense,
		membersData,
		searchMembers,
		anchorEl,
		handleMenuIconClick,
		handleMenuIconClose,
		generateMentorTypeHandle,
		removeNoticeHandler,
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
					<EnhancedTableToolbar />
					<TableBody>
					{notices && notices.length > 0 ? (
						notices.map((notice: Notice, index: number) => {
						const member_image = notice?.memberData?.memberImage?.[0] || '/image/profile/defaultUser.svg';

						const createdAt = notice.createdAt
							? dayjs(
								typeof notice.createdAt === 'string'
								? notice.createdAt
								//@ts-ignore
								: notice.createdAt.$date
							).format('YYYY-MM-DD HH:mm')
							: '—';

						return (
							<TableRow
							hover
							key={notice._id?.toString() || index}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
							<TableCell padding="checkbox">
								<Checkbox color="primary" />
							</TableCell>
							<TableCell align="left">{notice.noticeCategory}</TableCell>
							<TableCell align="left">{notice.noticeTitle}</TableCell>
							<TableCell align="left">{notice._id}</TableCell>
							<TableCell align="left" className={'name'}>
								<Stack direction={'row'}>
								<Link href={`/member?memberId=${notice?.memberId}`}>
									<Avatar
									alt="member"
									src={member_image}
									sx={{ ml: '2px', mr: '10px' }}
									/>
								</Link>
								<Link href={`/member?memberId=${notice?.memberId}`}>
									<div>{notice?.memberData?.memberNick}</div>
								</Link>
								</Stack>
							</TableCell>

							<TableCell align="left">{createdAt}</TableCell>

							<TableCell align="left">{notice.noticeStatus}</TableCell>
							<TableCell align="right">
								<Tooltip title={'delete'}>
								<IconButton onClick={() => removeNoticeHandler(notice._id)}>
									<DeleteRoundedIcon />
								</IconButton>
								</Tooltip>
								<Tooltip title="edit">
								<IconButton
									onClick={() =>
									router.push(`/admin/cs/notice_create?id=${notice._id}`)
									}
								>
									<NotePencil size={24} weight="fill" />
								</IconButton>
								</Tooltip>
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
