import { useQuery } from '@apollo/client';
import { Pagination, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { GET_VISITED } from '../../../apollo/user/query';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { T } from '../../types/common';
import { Model } from '../../types/model/model';
import ModelCard from '../model/ModelCard';

const RecentlyVisited: NextPage = ({ initialInput = [], ...props }: any) => {
	const device = useDeviceDetect();
	const [recentlyVisited, setRecentlyVisited] = useState<Model[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [searchVisited, setSearchVisited] = useState<T>({ page: 1, limit: 6 });

	/** APOLLO REQUESTS **/

	const {
		loading: getVisitedLoading,
		data: getVisitedData,
		error: getVisitedError,
		refetch: getVisitedRefetch,
	} = useQuery(GET_VISITED, {
		fetchPolicy: 'network-only',
		variables: { input: searchVisited },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setRecentlyVisited(data?.getVisited?.list);
			setTotal(data?.getVisited?.metaCounter[0]?.total ?? 0);
		}
	});

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchVisited({ ...searchVisited, page: value });
	};

	if (device === 'mobile') {
		return <div>AxisAuto MY FAVORITES MOBILE</div>;
	} else {
		return (
			<div id="my-favorites-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">Recently Visited</Typography>
						<Typography className="sub-title">We are glad to see you again!</Typography>
					</Stack>
				</Stack>
				<Stack className="favorites-list-box">
					{recentlyVisited?.length ? (
						recentlyVisited?.map((model: Model) => {
							return <ModelCard model={model} recentlyVisited={true} />;
						})
					) : (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>No Recently Visited Properties found!</p>
						</div>
					)}
				</Stack>
				{recentlyVisited?.length ? (
					<Stack className="pagination-config">
						<Stack className="pagination-box">
							<Pagination
								count={Math.ceil(total / searchVisited.limit)}
								page={searchVisited.page}
								shape="circular"
								sx={{
									'& .MuiPaginationItem-root': {
									color: '#405FF2', // text color for numbers
									},
									'& .MuiPaginationItem-root.Mui-selected': {
									backgroundColor: '#405FF2', // selected button background
									color: '#fff',              // selected button text
									},
									'& .MuiPaginationItem-root.Mui-selected:hover': {
									backgroundColor: '#3249c7', // darker on hover
									},
								}}
								onChange={paginationHandler}
							/>
						</Stack>
						<Stack className="total-result">
							<Typography>
								Total {total} recently visited model{total > 1 ? 'es' : ''}
							</Typography>
						</Stack>
					</Stack>
				) : null}
			</div>
		);
	}
};

export default RecentlyVisited;
