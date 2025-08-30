import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const GET_ALL_MEMBERS_BY_ADMIN = gql`
    query GetAllMembersByAdmin($input: MembersInquiry!) {
        getAllMembersByAdmin(input: $input) {
            list {
                _id
                memberType
                memberStatus
                memberAuthType
                memberEmail
                memberNick
                memberFullName
                memberImage
                memberAddress
                memberDesc
                memberModels
                memberArticles
                memberFollowers
                memberFollowings
                memberPoints
                memberLikes
                memberViews
                memberComments
                memberRank
                memberWarnings
                memberBlocks
                deletedAt
                createdAt
                updatedAt
                accessToken
            }
            metaCounter {
                total
            }
        }
    }
`;

/**************************
 *        MODEL        *
 *************************/

export const GET_ALL_MODELS_BY_ADMIN = gql`
    query GetAllModelsByAdmin($input: AllModelsInquiry!) {
        getAllModelsByAdmin(input: $input) {
            list {
                _id
                modelBrand
                modelType
                modelStatus
                modelLocation
                modelAddress
                modelTitle
                modelYear
                modelDesc
                modelPrice
                modelCurrency
                modelColour
                modelTransmission
                modelFuelType
                modelOdometer
                modelOdoUnit
                modelUlezCompliance
                modelViews
                modelLikes
                modelComments
                modelRank
                modelImages
                memberId
                soldAt
                deletedAt
                createdAt
                updatedAt
                memberData {
                    _id
                    memberType
                    memberStatus
                    memberAuthType
                    memberEmail
                    memberNick
                    memberFullName
                    memberImage
                    memberAddress
                    memberDesc
                    memberModels
                    memberArticles
                    memberFollowers
                    memberFollowings
                    memberPoints
                    memberSales
                    memberLikes
                    memberViews
                    memberComments
                    memberRank
                    memberWarnings
                    memberBlocks
                    deletedAt
                    createdAt
                    updatedAt
                    accessToken
                }
            }
            metaCounter {
                total
            }
        }
    }
`;

/**************************
 *        ORDER        *
 *************************/

export const GET_ORDER_BY_ADMIN = gql`
    query GetOrderByAdmin($input: String!) {
        getOrderByAdmin(orderId: $input) {
            _id
            buyerId
            modelId
            agentId
            orderStatus
            orderPrice
            paymentMethod
            isPaid
            soldAt
            paidAt
            processedAt
            createdAt
            updatedAt
            modelData {
                _id
                modelBrand
                modelType
                modelStatus
                modelLocation
                modelAddress
                modelTitle
                modelYear
                modelDesc
                modelPrice
                modelCurrency
                modelColour
                modelTransmission
                modelFuelType
                modelOdometer
                modelOdoUnit
                modelUlezCompliance
                modelViews
                modelLikes
                modelComments
                modelRank
                modelImages
                memberId
                soldAt
                deletedAt
                createdAt
                updatedAt
            }
            agentData {
                _id
                memberType
                memberStatus
                memberAuthType
                memberEmail
                memberNick
                memberFullName
                memberImage
                memberAddress
                memberDesc
                memberModels
                memberArticles
                memberFollowers
                memberFollowings
                memberPoints
                memberSales
                memberLikes
                memberViews
                memberComments
                memberRank
                memberWarnings
                memberBlocks
                deletedAt
                createdAt
                updatedAt
                accessToken
            }
            buyerData {
                _id
                memberType
                memberStatus
                memberAuthType
                memberEmail
                memberNick
                memberFullName
                memberImage
                memberAddress
                memberDesc
                memberModels
                memberArticles
                memberFollowers
                memberFollowings
                memberPoints
                memberSales
                memberLikes
                memberViews
                memberComments
                memberRank
                memberWarnings
                memberBlocks
                deletedAt
                createdAt
                updatedAt
                accessToken
            }
        }
    }
`;

export const GET_ALL_ORDERS_BY_ADMIN = gql`
    query GetAllOrdersByAdmin($input: OrderInquiry!) {
        getAllOrdersByAdmin(input: $input) {
            list {
                _id
                buyerId
                modelId
                agentId
                orderStatus
                orderPrice
                paymentMethod
                isPaid
                soldAt
                paidAt
                processedAt
                createdAt
                updatedAt
                modelData {
                    _id
                    modelBrand
                    modelType
                    modelStatus
                    modelLocation
                    modelAddress
                    modelTitle
                    modelYear
                    modelDesc
                    modelPrice
                    modelCurrency
                    modelColour
                    modelTransmission
                    modelFuelType
                    modelOdometer
                    modelOdoUnit
                    modelUlezCompliance
                    modelViews
                    modelLikes
                    modelComments
                    modelRank
                    modelImages
                    memberId
                    soldAt
                    deletedAt
                    createdAt
                    updatedAt
                }
                buyerData {
                    _id
                    memberType
                    memberStatus
                    memberAuthType
                    memberEmail
                    memberNick
                    memberFullName
                    memberImage
                    memberAddress
                    memberDesc
                    memberModels
                    memberArticles
                    memberFollowers
                    memberFollowings
                    memberPoints
                    memberSales
                    memberLikes
                    memberViews
                    memberComments
                    memberRank
                    memberWarnings
                    memberBlocks
                    deletedAt
                    createdAt
                    updatedAt
                    accessToken
                }
                agentData {
                    _id
                    memberType
                    memberStatus
                    memberAuthType
                    memberEmail
                    memberNick
                    memberFullName
                    memberImage
                    memberAddress
                    memberDesc
                    memberModels
                    memberArticles
                    memberFollowers
                    memberFollowings
                    memberPoints
                    memberSales
                    memberLikes
                    memberViews
                    memberComments
                    memberRank
                    memberWarnings
                    memberBlocks
                    deletedAt
                    createdAt
                    updatedAt
                    accessToken
                }
            }
            metaCounter {
                total
            }
        }
    }
`;

/**************************
 *        FAQ        *
 *************************/

export const GET_FAQS_BY_ADMIN = gql`
    query GetFaqsByAdmin($input: FaqsInquiry!) {
        getFaqsByAdmin(input: $input) {
            list {
                _id
                faqCategory
                faqStatus
                subject
                content
                writer
                createdAt
                updatedAt
                writerData {
                    _id
                    memberType
                    memberStatus
                    memberAuthType
                    memberEmail
                    memberNick
                    memberFullName
                    memberImage
                    memberAddress
                    memberDesc
                    memberModels
                    memberArticles
                    memberFollowers
                    memberFollowings
                    memberPoints
                    memberSales
                    memberLikes
                    memberViews
                    memberComments
                    memberRank
                    memberWarnings
                    memberBlocks
                    deletedAt
                    createdAt
                    updatedAt
                    accessToken
                }
            }
            metaCounter {
                total
            }
        }
    }
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const GET_ALL_BOARD_ARTICLES_BY_ADMIN = gql`
	query GetAllBoardArticlesByAdmin($input: AllBoardArticlesInquiry!) {
        getAllBoardArticlesByAdmin(input: $input) {
            list {
                _id
                articleCategory
                articleStatus
                articleTitle
                articleContent
                articleImage
                articleViews
                articleLikes
                articleComments
                memberId
                createdAt
                updatedAt
                memberData {
                    _id
                    memberType
                    memberStatus
                    memberAuthType
                    memberEmail
                    memberNick
                    memberFullName
                    memberImage
                    memberAddress
                    memberDesc
                    memberModels
                    memberArticles
                    memberFollowers
                    memberFollowings
                    memberPoints
                    memberSales
                    memberLikes
                    memberViews
                    memberComments
                    memberRank
                    memberWarnings
                    memberBlocks
                    deletedAt
                    createdAt
                    updatedAt
                    accessToken
                }
            }
            metaCounter {
                total
            }
        }
    }
`;

/**************************
 *         COMMENT        *
 *************************/

export const GET_COMMENTS = gql`
	query GetComments($input: CommentsInquiry!) {
		getComments(input: $input) {
			list {
				_id
				commentStatus
				commentGroup
				commentContent
				commentRefId
				memberId
				createdAt
				updatedAt
				memberData {
					_id
                    memberType
                    memberStatus
                    memberAuthType
                    memberEmail
                    memberNick
                    memberFullName
                    memberImage
                    memberAddress
                    memberDesc
                    memberModels
                    memberArticles
                    memberFollowers
                    memberFollowings
                    memberPoints
                    memberSales
                    memberLikes
                    memberViews
                    memberComments
                    memberRank
                    memberWarnings
                    memberBlocks
                    deletedAt
                    createdAt
                    updatedAt
                    accessToken
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

/**************************
 *         NOTICE        *
 *************************/

export const GET_ALL_NOTICE_BY_ADMIN = gql`
    query GetAllNoticesByAdmin($input: NoticesInquiry!) {
        getAllNoticesByAdmin(input: $input) {
            list {
                _id
                noticeCategory
                noticeStatus
                noticeTitle
                noticeContent
                memberId
                event
                createdAt
                updatedAt
                memberData {
                    _id
                    memberType
                    memberStatus
                    memberAuthType
                    memberEmail
                    memberNick
                    memberFullName
                    memberImage
                    memberAddress
                    memberDesc
                    memberModels
                    memberArticles
                    memberFollowers
                    memberFollowings
                    memberPoints
                    memberSales
                    memberLikes
                    memberViews
                    memberComments
                    memberRank
                    memberWarnings
                    memberBlocks
                    deletedAt
                    createdAt
                    updatedAt
                    accessToken
                }
            }
            metaCounter {
                total
            }
        }
    }
`;
