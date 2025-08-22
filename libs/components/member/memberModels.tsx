import { Pagination, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { T } from '../../types/common';
import { Model } from '../../types/model/model';
import { ModelsInquiry } from '../../types/model/model.input';
import { ModelCard } from '../mypage/ModelCard';

const MyModels: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const { memberId } = router.query;
	const [searchFilter, setSearchFilter] = useState<ModelsInquiry>({ ...initialInput });
	const [agentModels, setAgentModels] = useState<Model[]>([]);
	const [total, setTotal] = useState<number>(0);

	/** APOLLO REQUESTS **/

	/** LIFECYCLES **/
	useEffect(() => {}, [searchFilter]);

	useEffect(() => {
		if (memberId)
			setSearchFilter({ ...initialInput, search: { ...initialInput.search, memberId: memberId as string } });
	}, [memberId]);

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	if (device === 'mobile') {
		return <div>AxisAuto MODELS MOBILE</div>;
	} else {
		return (
			<div id="member-models-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">Models</Typography>
					</Stack>
				</Stack>
				<Stack className="properties-list-box">
					<Stack className="list-box">
						{agentModels?.length > 0 && (
							<Stack className="listing-title-box">
								<Typography className="title-text">Listing title</Typography>
								<Typography className="title-text">Date Published</Typography>
								<Typography className="title-text">Status</Typography>
								<Typography className="title-text">View</Typography>
							</Stack>
						)}
						{agentModels?.length === 0 && (
							<div className={'no-data'}>
								<img src="/img/icons/icoAlert.svg" alt="" />
								<p>No Model found!</p>
							</div>
						)}
						{agentModels?.map((model: Model) => {
							return <ModelCard model={model} memberPage={true} key={model?._id} />;
						})}

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
									<Typography>{total} model available</Typography>
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
			memberId: '',
		},
	},
};

export default MyModels;
