import { useMutation, useQuery } from '@apollo/client';
import { Pagination, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { LIKE_TARGET_MODEL } from '../../../apollo/user/mutation';
import { GET_FAVORITES } from '../../../apollo/user/query';
import { Message } from '../../enums/common.enum';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { T } from '../../types/common';
import { Model } from '../../types/model/model';
import ModelCard from '../model/ModelCard';

const MyFavorites: NextPage = () => {
	const device = useDeviceDetect();
	const [myFavorites, setMyFavorites] = useState<Model[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [searchFavorites, setSearchFavorites] = useState<T>({ page: 1, limit: 6 });

	/** APOLLO REQUESTS **/

	const [likeTargetModel] = useMutation(LIKE_TARGET_MODEL);
	
	const {
		loading: getFavoritesLoading,
		data: getFavoritesData,
		error: getFavoritesError,
		refetch: getFavoritesRefetch,
	} = useQuery(GET_FAVORITES, {
		fetchPolicy: 'network-only',
		variables: { input: searchFavorites },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setMyFavorites(data?.getFavorites?.list);
			setTotal(data?.getFavorites?.metaCounter[0]?.total ?? 0);
		}
	});

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFavorites({ ...searchFavorites, page: value });
	};

	const likeModelHandler = async (user: T, id: string) => {
		try {
			if(!id) return;
			if(!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			// execute likeTargetModel Mutuation
			await  likeTargetModel({
				variables: {input: id},
			});

			// execute getFavoritesRefetch
			await getFavoritesRefetch({ input: searchFavorites });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log("ERROR, likeModelHandler: ", err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	}

	if (device === 'mobile') {
		return <div>AxisAuto MY FAVORITES MOBILE</div>;
	} else {
		return (
			<div id="my-favorites-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">My Favorites</Typography>
						<Typography className="sub-title">We are glad to see you again!</Typography>
					</Stack>
				</Stack>
				<Stack className="favorites-list-box">
					{myFavorites?.length ? (
						myFavorites?.map((model: Model) => {
							return <ModelCard model={model} likeModelHandler={likeModelHandler} myFavorites={true} />;
						})
					) : (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>No Favorites found!</p>
						</div>
					)}
				</Stack>
				{myFavorites?.length ? (
					<Stack className="pagination-config">
						<Stack className="pagination-box">
							<Pagination
								count={Math.ceil(total / searchFavorites.limit)}
								page={searchFavorites.page}
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
								Total {total} favorite model{total > 1 ? 'es' : ''}
							</Typography>
						</Stack>
					</Stack>
				) : null}
			</div>
		);
	}
};

export default MyFavorites;
