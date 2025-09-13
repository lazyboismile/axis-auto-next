import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import EastIcon from '@mui/icons-material/East';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import WestIcon from '@mui/icons-material/West';
import { Box, Button, CircularProgress, Pagination as MuiPagination, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { userVar } from '../../apollo/store';
import { CREATE_COMMENT, CREATE_ORDER, LIKE_TARGET_MODEL } from '../../apollo/user/mutation';
import { GET_COMMENTS, GET_MODEL, GET_MODELS } from '../../apollo/user/query';
import ModelBigCard from '../../libs/components/common/ModelBigCard';
import withLayoutFull from '../../libs/components/layout/LayoutFull';
import Review from '../../libs/components/model/Review';
import { REACT_APP_API_URL } from '../../libs/config';
import { CommentGroup } from '../../libs/enums/comment.enum';
import { Direction, Message } from '../../libs/enums/common.enum';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import { Comment } from '../../libs/types/comment/comment';
import { CommentInput, CommentsInquiry } from '../../libs/types/comment/comment.input';
import { T } from '../../libs/types/common';
import { Model } from '../../libs/types/model/model';
import { formatterStr } from '../../libs/utils';

SwiperCore.use([Autoplay, Navigation, Pagination]);

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const ModelDetail: NextPage = ({ initialComment, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [modelId, setModelId] = useState<string | null>(null);
	const [model, setModel] = useState<Model | null>(null);
	const [slideImage, setSlideImage] = useState<string>('');
	const [destinationModels, setDestinationModels] = useState<Model[]>([]);
	const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>(initialComment);
	const [modelComments, setModelComments] = useState<Comment[]>([]);
	const [commentTotal, setCommentTotal] = useState<number>(0);
	const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
		commentGroup: CommentGroup.MODEL,
		commentContent: '',
		commentRefId: '',
	});

	/** APOLLO REQUESTS **/
	const [likeTargetModel] = useMutation(LIKE_TARGET_MODEL);
	const [createComment] = useMutation(CREATE_COMMENT);
	const [createOrder] = useMutation(CREATE_ORDER);

	const {
		loading: getModelLoading,
		data: getModelData,
		error: getModelError,
		refetch: getModelRefetch,
	} = useQuery(GET_MODEL, {
		fetchPolicy: "network-only",
		variables: { input: modelId },
		skip: !modelId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if(data?.getModel) setModel(data?.getModel);
			if(data?.getModel) setSlideImage(data?.getModel?.modelImages[0]);
		}
	});

	const {
		loading: getModelsLoading,
		data: getModelsData,
		error: getModelsError,
		refetch: getModelsRefetch,
	} = useQuery(GET_MODELS, {
		fetchPolicy: "cache-and-network",
		variables: { input: 
			{
				page: 1,
				limit: 4,
				sort: "createdAt",
				direction: Direction.DESC,
				search: {
					brandList: model?.modelBrand ? [model?.modelBrand] : [],
				},
			},
		 },
		 skip: !modelId && !model,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if(data?.getModels?.list) setDestinationModels(data?.getModels?.list);
		}
	});

	const {
		loading: getCommentsLoading,
		data: getCommentsData,
		error: getCommentsError,
		refetch: getCommentsRefetch,
	} = useQuery(GET_COMMENTS, {
		fetchPolicy: "cache-and-network",
		variables: { input: initialComment},
		 skip: !commentInquiry.search.commentRefId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if(data?.getComments?.list) setModelComments(data?.getComments?.list);
			setCommentTotal(data?.getComments?.metaCounter[0]?.total ?? 0);
		}
	});

	/** LIFECYCLES **/
	useEffect(() => {
	if (router.query.id) {
		setModelId(router.query.id as string);
		setCommentInquiry({
			...commentInquiry,
			search: { commentRefId: router.query.id as string },
		});

		setInsertCommentData({
			...insertCommentData,
			commentRefId: router.query.id as string,
		});
	}
	}, [router]);

	useEffect(() => {
		if(commentInquiry.search.commentRefId) {
			getCommentsRefetch({ input: commentInquiry })
		}
	}, [commentInquiry]);

	/** HANDLERS **/
	const changeImageHandler = (image: string) => {
		setSlideImage(image);
	};

	const likeModelHandler = async (user: T, id: string) => {
		try {
			if(!id) return;
			if(!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			// execute likeTargetModel Mutuation
			await  likeTargetModel({
				variables: {input: id},
			});

			// execute getModelsRefetch
			await getModelRefetch({ input: id });
			await getModelsRefetch({ input: 
				{
					page: 1,
					limit: 4,
					sort: "createdAt",
					direction: Direction.DESC,
					search: {
						// @ts-ignore
						brandList: [model?.modelBrand],
					},
				},	
			 });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log("ERROR, likeModelHandler: ", err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	}

	const commentPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
		commentInquiry.page = value;
		setCommentInquiry({ ...commentInquiry });
	};

	const doOrder = async (user: T, id: string) => {
		try {
			if(!id) return;
			if(!user._id) throw new Error(Message.NOT_AUTHENTICATED);
			
			await createOrder({
			variables: {
					input: { modelId: id },
				},
			});

			await sweetTopSmallSuccessAlert('success', 800);
			await router.push('/mypage?category=myOrders');
		} catch (err: any) {
			console.log("ERROR, doOrder: ", err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	}

	const createCommentHandler = async () => {
		try {
			if(!user._id) throw new Error(Message.NOT_AUTHENTICATED)
			await createComment({ variables: { input: insertCommentData } });

			setInsertCommentData({...insertCommentData, commentContent: ''});

			getCommentsRefetch({input: commentInquiry});
		} catch (err: any) {
			await sweetErrorHandling(err)
		}
	}

	if(getModelLoading) {
		return (
			<Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '1080px' }}>
				<CircularProgress size={'4rem'}  sx={{ color: '#405FF2' }}/>
			</Stack>
		)
	}


	if (device === 'mobile') {
		return <div>MODEL DETAIL PAGE</div>;
	} else {
		return (
			<div id={'model-detail-page'}>
				<div className={'container'}>
					<Stack className={'model-detail-config'}>
						<Stack className={'model-info-config'}>
							<Stack className={'info'}>
								<Stack className={'left-box'}>
									<Typography className='back'>
										<Link href="/model">
										<img src="/img/icons/logoutWhite.svg" alt="logout" />
										Back to search results</Link>
									</Typography>

									<Typography className={'title-main'}>{model?.modelTitle}</Typography>
									<Stack className={'top-box'}>
										<Typography className={'city'}>{model?.modelAddress}</Typography>
										<Stack className={'divider'}></Stack>
										<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
											<g clipPath="url(#clip0_6505_6282)">
												<path
													d="M7 14C5.61553 14 4.26216 13.5895 3.11101 12.8203C1.95987 12.0511 1.06266 10.9579 0.532846 9.67879C0.00303297 8.3997 -0.13559 6.99224 0.134506 5.63437C0.404603 4.2765 1.07129 3.02922 2.05026 2.05026C3.02922 1.07129 4.2765 0.404603 5.63437 0.134506C6.99224 -0.13559 8.3997 0.00303297 9.67879 0.532846C10.9579 1.06266 12.0511 1.95987 12.8203 3.11101C13.5895 4.26216 14 5.61553 14 7C14 8.85652 13.2625 10.637 11.9498 11.9498C10.637 13.2625 8.85652 14 7 14ZM7 0.931878C5.79984 0.931878 4.62663 1.28777 3.62873 1.95454C2.63084 2.62132 1.85307 3.56903 1.39379 4.67783C0.934505 5.78664 0.814336 7.00673 1.04848 8.18384C1.28262 9.36094 1.86055 10.4422 2.70919 11.2908C3.55783 12.1395 4.63907 12.7174 5.81617 12.9515C6.99327 13.1857 8.21337 13.0655 9.32217 12.6062C10.431 12.1469 11.3787 11.3692 12.0455 10.3713C12.7122 9.37337 13.0681 8.20016 13.0681 7C13.067 5.39099 12.4273 3.84821 11.2895 2.71047C10.1518 1.57273 8.60901 0.933037 7 0.931878Z"
													fill="#181A20"
												/>
												<path
													d="M9.0372 9.7275C8.97153 9.72795 8.90643 9.71543 8.84562 9.69065C8.7848 9.66587 8.72948 9.62933 8.68282 9.58313L6.68345 7.58375C6.63724 7.53709 6.6007 7.48177 6.57592 7.42096C6.55115 7.36015 6.53863 7.29504 6.53907 7.22938V2.7275C6.53907 2.59464 6.59185 2.46723 6.6858 2.37328C6.77974 2.27934 6.90715 2.22656 7.04001 2.22656C7.17287 2.22656 7.30028 2.27934 7.39423 2.37328C7.48817 2.46723 7.54095 2.59464 7.54095 2.7275V7.01937L9.39595 8.87438C9.47462 8.9425 9.53001 9.03354 9.55436 9.13472C9.57871 9.2359 9.5708 9.34217 9.53173 9.43863C9.49266 9.53509 9.4244 9.61691 9.3365 9.67264C9.24861 9.72836 9.14548 9.75519 9.04157 9.74938L9.0372 9.7275Z"
													fill="#181A20"
												/>
											</g>
											<defs>
												<clipPath id="clip0_6505_6282">
													<rect width="14" height="14" fill="white" />
												</clipPath>
											</defs>
										</svg>
										<Typography className={'date'}>{moment().diff(model?.createdAt, 'days')} days ago</Typography> *
									</Stack>
								</Stack>
								<Stack className={'right-box'}>
									<Stack className="buttons">
										<Stack className="button-box">
											<RemoveRedEyeIcon fontSize="medium" />
											<Typography>{model?.modelViews}</Typography>
										</Stack>
										<Stack className="button-box">
											{model?.meLiked && model?.meLiked[0]?.myFavorite ? (
												<FavoriteIcon color="primary" fontSize={'medium'}
												onClick={() => likeModelHandler(user, model?._id)} />
											) : (
												<FavoriteBorderIcon
													fontSize={'medium'}
													// @ts-ignore
													onClick={() => likeModelHandler(user, model?._id)}
												/>
											)}
											<Typography>{model?.modelLikes}</Typography>
										</Stack>
									</Stack>
									<Typography className={'price'}>${formatterStr(model?.modelPrice)}</Typography>
								</Stack>
							</Stack>
							<Stack className={'images'}>
								<Stack className={'main-image'}>
									<img
										src={slideImage ? `${REACT_APP_API_URL}/${slideImage}` : '/img/banner/header1.svg'}
										alt={'main-image'}
									/>
								</Stack>
								<Stack className={'sub-images'}>
									{model?.modelImages.map((subImg: string) => {
										const imagePath: string = `${REACT_APP_API_URL}/${subImg}`;
										return (
											<Stack className={'sub-img-box'} onClick={() => changeImageHandler(subImg)} key={subImg}>
												<img src={imagePath} alt={'sub-image'} />
											</Stack>
										);
									})}
								</Stack>
							</Stack>
						</Stack>
						<Stack className={'model-desc-config'}>
							<Stack className={'left-config'}>
								<Stack className={'options-config'}>
									<Stack className="option" direction="row" alignItems="center" spacing={1}>
									{/* Icon box */}
										<Stack className="svg-box">
											<img src="/img/icons/miles.svg" alt="Odometer" />
										</Stack>

										{/* Info box */}
										<Stack className="option-includes">
											<Typography className="title">Mileage</Typography>
											<Typography className="option-data">
											{formatterStr(model?.modelOdometer ?? 0)} {model?.modelOdoUnit === 'KILOMETERS' ? 'km' : 'mi'}
											</Typography>
										</Stack>
									</Stack>
									<Stack className={'option'}>
										<Stack className={'svg-box'}>
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="iompba0 iompba3 _1mgmi6k0 _1mgmi6k3" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8 7H5.16l-1.714 3H8zm2 0v3h6.172l-3-3zm-6.576-.992-2.44 4.268A2 2 0 0 0 0 12v4a2 2 0 0 0 2 2h.17a3.001 3.001 0 0 0 5.66 0h8.34a3.001 3.001 0 0 0 5.66 0H22a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4h-1l-4.414-4.414A2 2 0 0 0 13.172 5H5.16a2 2 0 0 0-1.737 1.008M21.83 16H22v-2l.001-.264C22.01 12.756 22.015 12 21 12H2v4h.17a3.001 3.001 0 0 1 5.66 0h8.34a3.001 3.001 0 0 1 5.66 0M5 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2m14 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" clip-rule="evenodd"></path></svg>
										</Stack>
										<Stack className={'option-includes'}>
											<Typography className={'title'}>Body type</Typography>
											<Typography className={'option-data'}>{model?.modelType}</Typography>
										</Stack>
									</Stack>
									<Stack className={'option'}>
										<Stack className={'svg-box'}>
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="iompba0 iompba3 _1mgmi6k0 _1mgmi6k3" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12 20.999c3.544 0 6-2.503 6-5.107 0-2.486-1.272-5.358-2.938-7.982A38 38 0 0 0 12 3.775 38 38 0 0 0 8.938 7.91C7.272 10.534 6 13.406 6 15.892c0 2.604 2.456 5.107 6 5.107M12 23c4.418 0 8-3.182 8-7.108 0-6.144-6.115-13.09-7.652-14.74a.473.473 0 0 0-.696 0C10.115 2.803 4 9.749 4 15.893 4 19.818 7.582 23 12 23" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M11 18.5a1 1 0 0 1 1-1c.91 0 1.505-.262 1.871-.629.367-.366.629-.96.629-1.871a1 1 0 1 1 2 0c0 1.298-.383 2.454-1.214 3.285-.832.832-1.988 1.215-3.286 1.215a1 1 0 0 1-1-1" clip-rule="evenodd"></path></svg>
										</Stack>
										<Stack className={'option-includes'}>
											<Typography className={'title'}>Fuel</Typography>
											<Typography className={'option-data'}>{model?.modelFuelType ?? "N/A"}</Typography>
										</Stack>
									</Stack>
									<Stack className={'option'}>
										<Stack className={'svg-box'}>
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="iompba0 iompba3 _1mgmi6k0 _1mgmi6k3" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="m11.689 6.33 2.219 5.618 6.977 5.634A3 3 0 0 1 22 19.916v2.266H2v-2.39a3 3 0 0 1 .886-2.128l4.81-4.778L6.24 9.004A4.5 4.5 0 0 1 3 4.682c0-.545.206-1.03.528-1.412.304-.36.702-.617 1.116-.772l3.484-1.307c.44-.165.941-.237 1.436-.16a2.25 2.25 0 0 1 1.403.782A4.5 4.5 0 0 1 12 4.683c0 .581-.11 1.137-.312 1.648m-3.28 2.76a4.5 4.5 0 0 0 1.875-.872l1.883 4.766a1.077 1.077 0 0 1-1.994.814zm4.534 6.809a3.13 3.13 0 0 0 1.043-1.278l.013-.03 5.63 4.547a1 1 0 0 1 .371.778v.266H4v-.39a1 1 0 0 1 .295-.709l4.2-4.172a3.08 3.08 0 0 0 2.237 1.519 3.03 3.03 0 0 0 2.211-.531M9.256 3.007a.9.9 0 0 0-.425.057L5.346 4.37a.7.7 0 0 0-.29.19c-.05.06-.056.098-.056.121A2.5 2.5 0 1 0 9.427 3.09c-.027-.032-.072-.066-.171-.082" clip-rule="evenodd"></path></svg>
										</Stack>
										<Stack className={'option-includes'}>
											<Typography className={'title'}>Transmission</Typography>
											<Typography className={'option-data'}>{model?.modelTransmission ?? "N/A"}</Typography>
										</Stack>
									</Stack>
									<Stack className={'option'}>
										<Stack className="svg-box">
											<img src="/img/icons/color-picker.svg" alt="CarPicker" />
										</Stack>
										<Stack className={'option-includes'}>
											<Typography className={'title'}>Colour</Typography>
											<Typography className={'option-data'}>{model?.modelColour ?? 'N/A'}</Typography>
										</Stack>
									</Stack>
								</Stack>
								<Stack className={'prop-desc-config'}>
									<Stack className={'top'}>
										<Typography className={'title'}>Comments from the dealer</Typography>
										<Typography className={'desc'}>{model?.modelDesc ?? 'No Description!'}</Typography>
									</Stack>
									<Stack className={'bottom'}>
										<Typography className={'title-d'}>Car details<span className="pluto">ø</span></Typography>
										<Stack className={'info-box'}>
											<Stack className={'left'}>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Price</Typography>
													<Typography className={'data'}>
														${formatterStr(model?.modelPrice) ?? 'N/A'}
													</Typography>
												</Box>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Brand</Typography>
													<Typography className={'data'}>{model?.modelBrand ?? 'N/A'}</Typography>
												</Box>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Colour</Typography>
													<Typography className={'data'}>{model?.modelColour ?? 'N/A'}</Typography>
												</Box>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Transmission</Typography>
													<Typography className={'data'}>{model?.modelTransmission ?? 'N/A'}</Typography>
												</Box>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Create Date</Typography>
													<Typography className={'data'}>{model?.modelYear ?? 'N/A'}</Typography>
												</Box>
											</Stack>
											<Stack className={'right'}>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Listing Date</Typography>
													<Typography className={'data'}>{moment(model?.createdAt).format('YYYY')}</Typography>
												</Box>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Body Type</Typography>
													<Typography className={'data'}>{model?.modelType ?? 'N/A'}</Typography>
												</Box>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Compliances</Typography>
													<Typography className={'data'}>
														{model?.modelUlezCompliance ?? 'N/A'}
													</Typography>
												</Box>
											</Stack>
										</Stack>
									</Stack>
								</Stack>
								<Stack className={'prop-desc-config'}>
									<Stack className={'bottom'}>
										<Typography className={'title'}>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-delear" fill="currentColor"aria-hidden="true"><path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8M6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8m2 10a3 3 0 0 0-3 3 1 1 0 1 1-2 0 5 5 0 0 1 5-5h8a5 5 0 0 1 5 5 1 1 0 1 1-2 0 3 3 0 0 0-3-3z"></path></svg>
											About this dealer
										</Typography>
										<Stack className={'info-box'}>
											<Stack className={'left'}>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Name</Typography>
													<Typography className={'data'}>{model?.memberData?.memberNick ?? 'N/A'}</Typography>
												</Box>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Location</Typography>
													<Typography className={'data-location'}>
														{model?.memberData?.memberAddress ?? 'N/A'}
													</Typography>
												</Box>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Member Since</Typography>
													<Typography className={'data'}>{moment(model?.memberData?.createdAt).format('YYYY')}</Typography>
												</Box>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Current ad listings</Typography>
													<Typography className={'data'}>{model?.memberData?.memberSales ?? 'N/A'}</Typography>
												</Box>
											</Stack>
										</Stack>
									</Stack>
								</Stack>
								<Stack className={'floor-plans-config'}>
									<Typography className={'title'}>Constructor Plans</Typography>
									<Stack className={'image-box'}>
										<img src={'/img/banner/header1.svg'} alt={'image'} />
									</Stack>
								</Stack>
								<Stack className={'address-config'}>
									<Typography className={'title'}>Address</Typography>
									<Stack className={'map-box'}>
										<iframe
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.6707700530933!2d-83.29064102321644!3d42.60255587117139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824bf2690f65dbf%3A0x77ab62c301b15059!2sPenske%20Automotive%20Group%2C%20Inc.!5e1!3m2!1sru!2s!4v1755667211884!5m2!1sru!2s"
											width="100%"
											height="100%"
											style={{ border: 0 }}
											allowFullScreen={true}
											loading="lazy"
											referrerPolicy="no-referrer-when-downgrade"
										></iframe>
									</Stack>
								</Stack>
								{commentTotal !== 0 && (
									<Stack className={'reviews-config'}>
										<Stack className={'filter-box'}>
											<Stack className={'review-cnt'}>
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
													<g clipPath="url(#clip0_6507_7309)">
														<path
															d="M15.7183 4.60288C15.6171 4.3599 15.3413 4.18787 15.0162 4.16489L10.5822 3.8504L8.82988 0.64527C8.7005 0.409792 8.40612 0.257812 8.07846 0.257812C7.7508 0.257812 7.4563 0.409792 7.32774 0.64527L5.57541 3.8504L1.14072 4.16489C0.815641 4.18832 0.540363 4.36035 0.438643 4.60288C0.337508 4.84586 0.430908 5.11238 0.676772 5.28084L4.02851 7.57692L3.04025 10.9774C2.96794 11.2275 3.09216 11.486 3.35771 11.636C3.50045 11.717 3.66815 11.7575 3.83643 11.7575C3.98105 11.7575 4.12577 11.7274 4.25503 11.667L8.07846 9.88098L11.9012 11.667C12.1816 11.7979 12.5342 11.7859 12.7992 11.636C13.0648 11.486 13.189 11.2275 13.1167 10.9774L12.1284 7.57692L15.4801 5.28084C15.7259 5.11238 15.8194 4.84641 15.7183 4.60288Z"
															fill="#181A20"
														/>
													</g>
													<defs>
														<clipPath id="clip0_6507_7309">
															<rect width="15.36" height="12" fill="white" transform="translate(0.398438)" />
														</clipPath>
													</defs>
												</svg>
												<Typography className={'reviews'}>{commentTotal} reviews</Typography>
											</Stack>
										</Stack>
										<Stack className={'review-list'}>
											{modelComments?.map((comment: Comment) => {
												return <Review comment={comment} key={comment?._id} />;
											})}
											<Box component={'div'} className={'pagination-box'}>
												<MuiPagination
													page={commentInquiry.page}
													count={Math.ceil(commentTotal / commentInquiry.limit)}
													onChange={commentPaginationChangeHandler}
													shape="circular"
													sx={{
														'& .MuiPaginationItem-root': {
															color: '#405FF2', 
														},
														'& .MuiPaginationItem-root.Mui-selected': {
															backgroundColor: '#405FF2',
															color: '#fff',
														},
														'& .MuiPaginationItem-root.Mui-selected:hover': {
															backgroundColor: '#3249c7',
														},
													}}
												/>

											</Box>
										</Stack>
									</Stack>
								)}
								<Stack className={'leave-review-config'}>
									<Typography className={'main-title'}>Leave A Review</Typography>
									<Typography className={'review-title'}>Review</Typography>
									<textarea
										onChange={({ target: { value } }: any) => {
											setInsertCommentData({ ...insertCommentData, commentContent: value });
										}}
										value={insertCommentData.commentContent}
									></textarea>
									<Box className={'submit-btn'} component={'div'}>
										<Button
											className={'submit-review'}
											disabled={insertCommentData.commentContent === '' || user?._id === ''}
											onClick={createCommentHandler}
										>
											<Typography className={'title'}>Submit Review</Typography>
											<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
												<g clipPath="url(#clip0_6975_3642)">
													<path
														d="M16.157	1 0.5H6.37936C6.1337 0.5 5.93491 0.698792 5.93491 0.944458C5.93491 1.19012 6.1337 1.38892 6.37936 1.38892H15.0842L0.731781 15.7413C0.558156 15.915 0.558156 16.1962 0.731781 16.3698C0.818573 16.4566 0.932323 16.5 1.04603 16.5C1.15974 16.5 1.27345 16.4566 1.36028 16.3698L15.7127 2.01737V10.7222C15.7127 10.9679 15.9115 11.1667 16.1572 11.1667C16.4028 11.1667 16.6016 10.9679 16.6016 10.7222V0.944458C16.6016 0.698792 16.4028 0.5 16.1571 0.5Z"
														fill="#181A20"
													/>
												</g>
												<defs>
													<clipPath id="clip0_6975_3642">
														<rect width="16" height="16" fill="white" transform="translate(0.601562 0.5)" />
													</clipPath>
												</defs>
											</svg>
										</Button>
									</Box>
								</Stack>
							</Stack>
							<Stack className={'right-config'}>
								<Stack className={'info-box'}>
									<Typography className={'main-title'}>Get More Information</Typography>
									<Stack className={'image-info'}>
										<img
											className={'member-image'}
											src={
												model?.memberData?.memberImage
													? `${REACT_APP_API_URL}/${model?.memberData?.memberImage}`
													: '/img/profile/defaultUser.svg'
											}
										/>
										<Stack className={'name-phone-listings'}>
											<Link href={`/member?memberId=${model?.memberData?._id}`}>
												<Typography className={'name'}>{model?.memberData?.memberNick}</Typography>
											</Link>
											<Stack className={'phone-number'}>
												<img src='/img/icons/chat.svg'/>
												<Typography className={'number'}>{model?.memberData?.memberEmail}</Typography>
											</Stack>
											<Typography className={'listings'}>View Listings</Typography>
										</Stack>
									</Stack>
								</Stack>
								<Stack className={'info-box'}>
									<Typography className={'sub-title'}>Name</Typography>
									<input type={'text'} placeholder={'Enter your name'} />
								</Stack>
								<Stack className={'info-box'}>
									<Typography className={'sub-title'}>Email</Typography>
									<input type={'text'} placeholder={'Enter your email'} />
								</Stack>
								<Stack className={'info-box'}>
									<Typography className={'sub-title'}>Phone</Typography>
									<input type={'text'} placeholder={'Enter your phone'} />
								</Stack>
								<Stack className={'info-box'}>
									<Typography className={'sub-title'}>Message</Typography>
									<textarea placeholder={'Type your message here'}></textarea>
								</Stack>
								<Stack className={'info-box'}>
									<Button className={'send-message'}>
										<Typography className={'title'}>Contact Dealer</Typography>
										<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
											<g clipPath="url(#clip0_6975_593)">
												<path
													d="M16.0556 0.5H6.2778C6.03214 0.5 5.83334 0.698792 5.83334 0.944458C5.83334 1.19012 6.03214 1.38892 6.2778 1.38892H14.9827L0.630219 15.7413C0.456594 15.915 0.456594 16.1962 0.630219 16.3698C0.71701 16.4566 0.83076 16.5 0.944469 16.5C1.05818 16.5 1.17189 16.4566 1.25872 16.3698L15.6111 2.01737V10.7222C15.6111 10.9679 15.8099 11.1667 16.0556 11.1667C16.3013 11.1667 16.5001 10.9679 16.5001 10.7222V0.944458C16.5 0.698792 16.3012 0.5 16.0556 0.5Z"
													fill="white"
												/>
											</g>
											<defs>
												<clipPath id="clip0_6975_593">
													<rect width="16" height="16" fill="white" transform="translate(0.5 0.5)" />
												</clipPath>
											</defs>
										</svg>
									</Button>

									<Button className="bid-message" onClick={() => model?._id && doOrder(user, model._id)}>
										<Typography className="title">Make a Bid</Typography>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="17"
											height="17"
											viewBox="0 0 17 17"
											fill="none"
										>
											<g clipPath="url(#clip0_6975_593)">
											<path
												d="M16.0556 0.5H6.2778C6.03214 0.5 5.83334 0.698792 5.83334 0.944458C5.83334 1.19012 6.03214 1.38892 6.2778 1.38892H14.9827L0.630219 15.7413C0.456594 15.915 0.456594 16.1962 0.630219 16.3698C0.71701 16.4566 0.83076 16.5 0.944469 16.5C1.05818 16.5 1.17189 16.4566 1.25872 16.3698L15.6111 2.01737V10.7222C15.6111 10.9679 15.8099 11.1667 16.0556 11.1667C16.3013 11.1667 16.5001 10.9679 16.5001 10.7222V0.944458C16.5 0.698792 16.3012 0.5 16.0556 0.5Z"
												fill="white"
											/>
											</g>
											<defs>
											<clipPath id="clip0_6975_593">
												<rect width="16" height="16" fill="white" transform="translate(0.5 0.5)" />
											</clipPath>
											</defs>
										</svg>
									</Button>
								</Stack>
							</Stack>
						</Stack>
						{destinationModels.length !== 0 && (
							<Stack className={'similar-models-config'}>
								<Stack className={'title-pagination-box'}>
									<Stack className={'title-box'}>
										<Typography className={'main-title'}>{model?.modelBrand} Models</Typography>
										<Typography className={'sub-title'}>Aliquam lacinia diam quis lacus euismod</Typography>
									</Stack>
									<Stack className={'pagination-box'}>
										<WestIcon className={'swiper-similar-prev'} />
										<div className={'swiper-similar-pagination'}></div>
										<EastIcon className={'swiper-similar-next'} />
									</Stack>
								</Stack>
								<Stack className={'cards-box'}>
									<Swiper
										className={'similar-homes-swiper'}
										slidesPerView={'auto'}
										spaceBetween={35}
										modules={[Autoplay, Navigation, Pagination]}
										navigation={{
											nextEl: '.swiper-similar-next',
											prevEl: '.swiper-similar-prev',
										}}
										pagination={{
											el: '.swiper-similar-pagination',
										}}
									>
										{destinationModels.map((model: Model) => {
											return (
												<SwiperSlide className={'similar-homes-slide'} key={model.modelTitle}>
													<ModelBigCard model={model} likeModelHandler={likeModelHandler} key={model?._id} />
												</SwiperSlide>
											);
										})}
									</Swiper>
								</Stack>
							</Stack>
						)}
					</Stack>
				</div>
			</div>
		);
	}
};

ModelDetail.defaultProps = {
	initialComment: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		direction: 'DESC',
		search: {
			commentRefId: '',
		},
	},
};

export default withLayoutFull(ModelDetail);
