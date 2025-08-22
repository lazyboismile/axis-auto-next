import { useReactiveVar } from '@apollo/client';
import { Pagination, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { userVar } from '../../../apollo/store';
import { ModelStatus } from '../../enums/model.enum';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { T } from '../../types/common';
import { Model } from '../../types/model/model';
import { AgentModelsInquiry } from '../../types/model/model.input';
import { ModelCard } from './ModelCard';

const MyModels: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const [searchFilter, setSearchFilter] = useState<AgentModelsInquiry>(initialInput);
	const [agentModels, setAgentModels] = useState<Model[]>([]);
	const [total, setTotal] = useState<number>(0);
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** APOLLO REQUESTS **/

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	const changeStatusHandler = (value: ModelStatus) => {
		setSearchFilter({ ...searchFilter, search: { modelStatus: value } });
	};

	const deleteModelHandler = async (id: string) => {};

	const updateModelHandler = async (status: string, id: string) => {};

	// if (user?.memberType !== 'AGENT') {
	// 	router.back();
	// }

	if (device === 'mobile') {
		return <div>AxisAuto MODELS MOBILE</div>;
	} else {
		return (
			<div id="my-model-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">My Models</Typography>
						<Typography className="sub-title">We are glad to see you again!</Typography>
					</Stack>
				</Stack>
				<Stack className="model-list-box">
					<Stack className="tab-name-box">
						<Typography
							onClick={() => changeStatusHandler(ModelStatus.LIVE)}
							className={searchFilter.search.modelStatus === 'LIVE' ? 'active-tab-name' : 'tab-name'}
						>
							On Sale
						</Typography>
						<Typography
							onClick={() => changeStatusHandler(ModelStatus.SOLD)}
							className={searchFilter.search.modelStatus === 'SOLD' ? 'active-tab-name' : 'tab-name'}
						>
							On Sold
						</Typography>
					</Stack>
					<Stack className="list-box">
						<Stack className="listing-title-box">
							<Typography className="title-text">Listing title</Typography>
							<Typography className="title-text">Date Published</Typography>
							<Typography className="title-text">Status</Typography>
							<Typography className="title-text">View</Typography>
							<Typography className="title-text">Action</Typography>
						</Stack>

						{agentModels?.length === 0 ? (
							<div className={'no-data'}>
								<img src="/img/icons/icoAlert.svg" alt="" />
								<p>No Models found!</p>
							</div>
						) : (
							agentModels.map((model: Model) => {
								return (
									<ModelCard
										model={model}
										deleteModelHandler={deleteModelHandler}
										updateModelHandler={updateModelHandler}
									/>
								);
							})
						)}

						{agentModels.length !== 0 && (
							<Stack className="pagination-config">
								<Stack className="pagination-box">
									<Pagination
										count={Math.ceil(total / searchFilter.limit)}
										page={searchFilter.page}
										shape="circular"
										color="primary"
										onChange={paginationHandler}
									/>
								</Stack>
								<Stack className="total-result">
									<Typography>{total} models available</Typography>
								</Stack>
							</Stack>
						)}
					</Stack>
				</Stack>
			</div>
		);
	}
};

MyModels.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		search: {
			modelStatus: 'LIVE',
		},
	},
};

export default MyModels;
