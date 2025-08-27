import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import { Menu, MenuItem, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Moment from 'react-moment';
import { ModelStatus } from '../../enums/model.enum';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Model } from '../../types/model/model';
import { formatterStr } from '../../utils';

interface ModelCardProps {
	model: Model;
	deleteModelHandler?: any;
	memberPage?: boolean;
	updateModelHandler?: any;
}

export const ModelCard = (props: ModelCardProps) => {
	const { model, deleteModelHandler, memberPage, updateModelHandler} = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	/** HANDLERS **/
	const pushEditModel = async (id: string) => {
		console.log('+pushEditModel: ', id);
		await router.push({
			pathname: '/mypage',
			query: { category: 'addModel', modelId: id },
		});
	};

	const pushModelDetail = async (id: string) => {
		if (memberPage)
			await router.push({
				pathname: '/model/detail',
				query: { id: id },
			});
		else return;
	};

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	if (device === 'mobile') {
		return <div>MOBILE MODEL CARD</div>;
	} else
		return (
			<Stack className="model-card-box">
				<Stack className="image-box" onClick={() => pushModelDetail(model?._id)}>
                    <img src={`${process.env.REACT_APP_API_URL}/${model.modelImages[0]}`} alt="" />
				</Stack>
				<Stack className="information-box" onClick={() => pushModelDetail(model?._id)}>
					<Typography className="name">{model.modelTitle ?? 'N/A'}</Typography>
					<Typography className="address">{model.modelAddress  ?? 'N/A'}</Typography>
					<Typography className="price">
						<strong>${formatterStr(model?.modelPrice)}</strong>
					</Typography>
				</Stack>
				<Stack className="date-box">
					<Typography className="date">
						<Moment format="DD MMMM, YYYY">{model.createdAt}</Moment>
					</Typography>
				</Stack>
				<Stack className="status-box">
					<Stack className="coloured-box" sx={{ background: '#E5F0FD' }} onClick={handleClick}>
						<Typography className="status" sx={{ color: '#3554d1' }}>
							{model.modelStatus}
						</Typography>
					</Stack>
				</Stack>
				{!memberPage && model.modelStatus !== 'SOLD' && (
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
								width: '70px',
								mt: 1,
								ml: '10px',
								overflow: 'visible',
								filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							},
							style: {
								padding: 0,
								display: 'flex',
								justifyContent: 'center',
							},
						}}
					>
						{model.modelStatus === 'LIVE' && (
							<>
								<MenuItem
									disableRipple
									onClick={() => {
										handleClose();
										updateModelHandler(ModelStatus.SOLD, model?._id);
									}}
								>
									Sold
								</MenuItem>
							</>
						)}
					</Menu>
				)}

				<Stack className="views-box">
					<Typography className="views">
                        {model?.modelViews?.toLocaleString() ?? '0'}
                    </Typography>
				</Stack>
				{!memberPage && model.modelStatus === ModelStatus.LIVE && (
					<Stack className="action-box">
						<IconButton className="icon-button" onClick={() => pushEditModel(model._id)}>
							<ModeIcon className="buttons" />
						</IconButton>
						<IconButton className="icon-button" onClick={() => deleteModelHandler(model._id)}>
							<DeleteIcon className="buttons" />
						</IconButton>
					</Stack>
				)}
			</Stack>
		);
};
