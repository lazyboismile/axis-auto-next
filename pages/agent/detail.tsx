import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import StarIcon from '@mui/icons-material/Star';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { userVar } from '../../apollo/store';
import { CREATE_COMMENT, LIKE_TARGET_MODEL } from '../../apollo/user/mutation';
import { GET_COMMENTS, GET_MEMBER, GET_MODELS } from '../../apollo/user/query';
import ReviewCard from '../../libs/components/agent/ReviewCard';
import ModelBigCard from '../../libs/components/common/ModelBigCard';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { REACT_APP_API_URL } from '../../libs/config';
import { CommentGroup } from '../../libs/enums/comment.enum';
import { Message } from '../../libs/enums/common.enum';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import { Comment } from '../../libs/types/comment/comment';
import { CommentInput, CommentsInquiry } from '../../libs/types/comment/comment.input';
import { T } from '../../libs/types/common';
import { Member } from '../../libs/types/member/member';
import { Model } from '../../libs/types/model/model';
import { ModelsInquiry } from '../../libs/types/model/model.input';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const AgentDetail: NextPage = ({ initialInput, initialComment, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [mbId, setMbId] = useState<string | null>(null);
	const [agent, setAgent] = useState<Member | null>(null);
	const [searchFilter, setSearchFilter] = useState<ModelsInquiry>(initialInput);
	const [agentModels, setAgentModels] = useState<Model[]>([]);
	const [modelTotal, setModelTotal] = useState<number>(0);
	const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>(initialComment);
	const [agentComments, setAgentComments] = useState<Comment[]>([]);
	const [commentTotal, setCommentTotal] = useState<number>(0);
	const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
		commentGroup: CommentGroup.MEMBER,
		commentContent: '',
		commentRefId: '',
	});

	/** APOLLO REQUESTS **/
	const [createComment] = useMutation(CREATE_COMMENT);
	const [likeTargetModel] =useMutation(LIKE_TARGET_MODEL);

	const {
		loading: getMemberLoading,
		data: getMemberData,
		error: getMemberError,
		refetch: getMemberRefetch,
	} = useQuery(GET_MEMBER, {
		fetchPolicy: "network-only",
		variables: { input: mbId },
		skip: !mbId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if(data?.getMember) setAgent(data?.getMember);
			setSearchFilter({ 
				...searchFilter, 
				search: { 
					memberId: data?.getMember?._id 
				} });
			setCommentInquiry({ 
				...commentInquiry, 
				search: { 
					commentRefId: data?.getMember?._id 
				} });
				setInsertCommentData({
					...insertCommentData,
					commentRefId: data?.getMember?._id,
				});
		}
	});

	const {
		loading: getModelsLoading,
		data: getModelsData,
		error: getModelsError,
		refetch: getModelsRefetch,
	} = useQuery(GET_MODELS, {
		fetchPolicy: "network-only",
		variables: { input: searchFilter },
		skip: !searchFilter.search.memberId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setAgentModels(data?.getModels?.list);
			setModelTotal(data?.getModels?.metaCounter[0]?.total ?? 0);
		}
	});

	const {
		loading: getCommentsLoading,
		data: getCommentsData,
		error: getCommentsError,
		refetch: getCommentsRefetch,
	} = useQuery(GET_COMMENTS, {
		fetchPolicy: "network-only",
		variables: { input: commentInquiry },
		skip: !commentInquiry.search.commentRefId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setAgentComments(data?.getComments?.list);
			setCommentTotal(data?.getComments?.metaCounter[0]?.total ?? 0);
		}
	});
	
	/** LIFECYCLES **/
	useEffect(() => {
		if (router.query.agentId) setMbId(router.query.agentId as string);
	}, [router]);

	useEffect(() => {
		if(searchFilter.search.memberId) {
			getModelsRefetch({ variables: { input: searchFilter } }).then();
		}
	}, [searchFilter]);

	useEffect(() => {
		if(commentInquiry.search.commentRefId) {
			getCommentsRefetch({ variables: { input: commentInquiry } }).then();
		}
	}, [commentInquiry]);

	/** HANDLERS **/
	const redirectToMemberPageHandler = async (memberId: string) => {
		try {
			if (memberId === user?._id) await router.push(`/mypage?memberId=${memberId}`);
			else await router.push(`/member?memberId=${memberId}`);
		} catch (error) {
			await sweetErrorHandling(error);
		}
	};

	const modelPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
		searchFilter.page = value;
		setSearchFilter({ ...searchFilter });
	};

	const commentPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
		commentInquiry.page = value;
		setCommentInquiry({ ...commentInquiry });
	};

	const createCommentHandler = async () => {
		try {
			if(!user?._id) throw new Error(Message.NOT_AUTHENTICATED);
			if(user._id === mbId) throw new Error('You cannot review yourself');
			await createComment({
				variables: { input: insertCommentData },
			})
			setInsertCommentData({
				...insertCommentData,
				commentContent: '',
			});

			await getCommentsRefetch({ variables: { input: commentInquiry } }).then();
			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
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
			await getModelsRefetch({ input: searchFilter });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log("ERROR, likeModelHandler: ", err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	}

	if (device === 'mobile') {
		return <div>AGENT DETAIL PAGE MOBILE</div>;
	} else {
		return (
			<Stack className={'agent-detail-page'}>
				<Stack className={'container'}>
					<Stack className={'agent-info'}>
						<img
							src={agent?.memberImage ? `${REACT_APP_API_URL}/${agent?.memberImage}` : '/img/profile/defaultUser.svg'}
							alt=""
						/>
						<Box component={'div'} className={'info'} onClick={() => redirectToMemberPageHandler(agent?._id as string)}>
							<strong>{agent?.memberFullName ?? agent?.memberNick}</strong>
							<div>
								<img src="/img/icons/chat.svg" alt="" />
								<span>{agent?.memberEmail}</span>
							</div>
						</Box>
					</Stack>
					<Stack className={'agent-home-list'}>
						<Stack className={'card-wrap'}>
							{agentModels.map((model: Model) => {
								return (
									<div className={'wrap-main'} key={model?._id}>
										<ModelBigCard model={model} likeModelHandler={likeModelHandler} key={model?._id} />
									</div>
								);
							})}
						</Stack>
						<Stack className={'pagination'}>
							{modelTotal ? (
								<>
									<Stack className="pagination-box">
										<Pagination
											page={searchFilter.page}
											count={Math.ceil(modelTotal / searchFilter.limit) || 1}
											onChange={modelPaginationChangeHandler}
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
									</Stack>
									<span>
										Total {modelTotal} model{modelTotal > 1 ? 'es' : ''} available
									</span>
								</>
							) : (
								<div className={'no-data'}>
									<img src="/img/icons/icoAlert.svg" alt="" />
									<p>No models found!</p>
								</div>
							)}
						</Stack>
					</Stack>
					<Stack className={'review-box'}>
						<Stack className={'main-intro'}>
							<span>Reviews</span>
							<p>we are glad to see you again</p>
						</Stack>
						{commentTotal !== 0 && (
							<Stack className={'review-wrap'}>
								<Box component={'div'} className={'title-box'}>
									<StarIcon />
									<span>
										{commentTotal} review{commentTotal > 1 ? 's' : ''}
									</span>
								</Box>
								{agentComments?.map((comment: Comment) => {
									return <ReviewCard comment={comment} key={comment?._id} />;
								})}
								<Box component={'div'} className={'pagination-box'}>
									<Pagination
										page={commentInquiry.page}
										count={Math.ceil(commentTotal / commentInquiry.limit) || 1}
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
												d="M16.1571 0.5H6.37936C6.1337 0.5 5.93491 0.698792 5.93491 0.944458C5.93491 1.19012 6.1337 1.38892 6.37936 1.38892H15.0842L0.731781 15.7413C0.558156 15.915 0.558156 16.1962 0.731781 16.3698C0.818573 16.4566 0.932323 16.5 1.04603 16.5C1.15974 16.5 1.27345 16.4566 1.36028 16.3698L15.7127 2.01737V10.7222C15.7127 10.9679 15.9115 11.1667 16.1572 11.1667C16.4028 11.1667 16.6016 10.9679 16.6016 10.7222V0.944458C16.6016 0.698792 16.4028 0.5 16.1571 0.5Z"
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
				</Stack>
			</Stack>
		);
	}
};

AgentDetail.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		search: {
			memberId: '',
		},
	},
	initialComment: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		direction: 'ASC',
		search: {
			commentRefId: '',
		},
	},
};

export default withLayoutBasic(AgentDetail);
