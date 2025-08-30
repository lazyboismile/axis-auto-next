import DeleteIcon from '@mui/icons-material/Delete';
import {
	Button, Fade, Menu, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React from 'react';
import { REACT_APP_API_URL } from '../../../config';
import { ModelStatus } from '../../../enums/model.enum';
import { Model } from '../../../types/model/model';
import { formatterStr } from '../../../utils';

interface Data {
	id: string;
	title: string;
	price: string;
	agent: string;
	location: string;
	type: string;
	status: string;
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
		id: 'id',
		numeric: true,
		disablePadding: false,
		label: 'MB ID',
	},
	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'TITLE',
	},
	{
		id: 'price',
		numeric: false,
		disablePadding: false,
		label: 'PRICE',
	},
	{
		id: 'agent',
		numeric: false,
		disablePadding: false,
		label: 'AGENT',
	},
	{
		id: 'location',
		numeric: false,
		disablePadding: false,
		label: 'LOCATION',
	},
	{
		id: 'type',
		numeric: false,
		disablePadding: false,
		label: 'TYPE',
	},
	{
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'STATUS',
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, model: keyof Data) => void;
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

interface ModelPanelListType {
	models: Model[];
	anchorEl: any;
	menuIconClickHandler: any;
	menuIconCloseHandler: any;
	updateModelHandler: any;
	removeModelHandler: any;
}

export const ModelPanelList = (props: ModelPanelListType) => {
	const {
		models: models,
		anchorEl,
		menuIconClickHandler,
		menuIconCloseHandler,
		updateModelHandler,
		removeModelHandler,
	} = props;

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{models.length === 0 && (
							<TableRow>
								<TableCell align="center" colSpan={8}>
									<span className={'no-data'}>data not found!</span>
								</TableCell>
							</TableRow>
						)}

						{models.length !== 0 &&
							models.map((model: Model, index: number) => {
								const modelImage = `${REACT_APP_API_URL}/${model?.modelImages[0]}`;

								return (
									<TableRow hover key={model?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell align="left">{model._id}</TableCell>
										<TableCell align="left" className={'name'}>
										{model.modelStatus === ModelStatus.LIVE ?(
											<Stack direction={'row'}>
												<Link href={`/model/detail?id=${model?._id}`}>
													<div>
														<Avatar alt="Remy Sharp" src={modelImage} sx={{ ml: '2px', mr: '10px' }} />
													</div>
												</Link>
												<Link href={`/model/detail?id=${model?._id}`}>
													<div>{model.modelTitle}</div>
												</Link>
											</Stack>
										) : (
											<Stack direction={'row'}>
													<div>
														<Avatar alt="Remy Sharp" src={modelImage} sx={{ ml: '2px', mr: '10px' }} />
													</div>
													<div>{model.modelTitle}</div>
											</Stack>
										)}
										</TableCell>
										<TableCell align="center">{formatterStr(model?.modelPrice)}</TableCell>
										<TableCell align="center">{model.memberData?.memberNick}</TableCell>
										<TableCell align="center">{model.modelLocation}</TableCell>
										<TableCell align="center">{model.modelType}</TableCell>
										<TableCell align="center">
											{model.modelStatus === ModelStatus.DELETE && (
												<Button
													variant="outlined"
													sx={{ p: '3px', border: 'none', ':hover': { border: '1px solid #000000' } }}
													onClick={() => removeModelHandler(model._id)}
												>
													<DeleteIcon fontSize="small" />
												</Button>
											)}

											{model.modelStatus === ModelStatus.SOLD && (
												<Button className={'badge warning'}>{model.modelStatus}</Button>
											)}

											{model.modelStatus === ModelStatus.PENDING && (
												<>
													<Button onClick={(e: any) => menuIconClickHandler(e, index)} className={'badge success'}>
														{model.modelStatus}
													</Button>

													<Menu
														className={'menu-modal'}
														MenuListProps={{
															'aria-labelledby': 'fade-button',
														}}
														anchorEl={anchorEl[index]}
														open={Boolean(anchorEl[index])}
														onClose={menuIconCloseHandler}
														TransitionComponent={Fade}
														sx={{ p: 1 }}
													>
														{Object.values(ModelStatus)
															.filter((ele) => ele !== model.modelStatus)
															.map((status: string) => (
																<MenuItem
																	onClick={() => updateModelHandler({ _id: model._id, modelStatus: status })}
																	key={status}
																>
																	<Typography variant={'subtitle1'} component={'span'}>
																		{status}
																	</Typography>
																</MenuItem>
															))}
													</Menu>
												</>
											)}

											{model.modelStatus === ModelStatus.LIVE && (
												<>
													<Button onClick={(e: any) => menuIconClickHandler(e, index)} className={'badge success'}>
														{model.modelStatus}
													</Button>

													<Menu
														className={'menu-modal'}
														MenuListProps={{
															'aria-labelledby': 'fade-button',
														}}
														anchorEl={anchorEl[index]}
														open={Boolean(anchorEl[index])}
														onClose={menuIconCloseHandler}
														TransitionComponent={Fade}
														sx={{ p: 1 }}
													>
														{Object.values(ModelStatus)
															.filter((ele) => ele !== model.modelStatus)
															.map((status: string) => (
																<MenuItem
																	onClick={() => updateModelHandler({ _id: model._id, modelStatus: status })}
																	key={status}
																>
																	<Typography variant={'subtitle1'} component={'span'}>
																		{status}
																	</Typography>
																</MenuItem>
															))}
													</Menu>
												</>
											)}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
