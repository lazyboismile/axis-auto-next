import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const GET_AGENTS = gql`
    query GetAgents($input: AgentsInquiry!) {
        getAgents(input: $input) {
            list {
                _id
                memberType
                memberStatus
                memberAuthType
                memberEmail
                memberNick
                memberFullName
                memberDesc
                memberSales
                memberImage
                memberAddress
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
                meLiked {
                    memberId
                    likeRefId
                    myFavorite
                }
            }
            metaCounter {
                total
            }
        }
    }
`;

export const GET_MEMBER = gql`
    query GetMember($input: String!) {
        getMember(memberId: $input) {
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
            meFollowed {
                followingId
                followerId
                myFollowing
            }
        }
    }
`;

/**************************
 *        MODEL        *
 *************************/

export const GET_MODEL = gql`
    query GetModel($input: String!) {
        getModel(modelId: $input) {
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
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
        }
    }
`;

export const GET_MODELS = gql`
    query GetModels($input: ModelsInquiry!) {
        getModels(input: $input) {
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
                    memberSales
                }
                meLiked {
                    memberId
                    likeRefId
                    myFavorite
                }
            }
            metaCounter {
                total
            }
        }
    }
`;

export const GET_AGENT_MODELS = gql`
    query GetAgentModels($input: AgentModelsInquiry!) {
        getAgentModels(input: $input) {
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
            }
            metaCounter {
                total
            }
        }
    }
`;

export const GET_FAVORITES = gql`
    query GetFavorites($input: OrdinaryInquiry!) {
        getFavorites(input: $input) {
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

export const GET_VISITED = gql`
    query GetVisited($input: OrdinaryInquiry!) {
        getVisited(input: $input) {
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
 *      BOARD-ARTICLE     *
 *************************/

export const GET_BOARD_ARTICLE = gql`
    query GetBoardArticle($input: String!) {
        getBoardArticle(articleId: $input) {
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
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
        }
    }
`;

export const GET_BOARD_ARTICLES = gql`
    query GetBoardArticles($input: BoardArticlesInquiry!) {
        getBoardArticles(input: $input) {
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
                meLiked {
                    memberId
                    likeRefId
                    myFavorite
                }
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
                }
            }
            metaCounter {
                total
            }
        }
    }
`;

/**************************
 *         ORDER        *
 *************************/

export const GET_MY_ORDERS = gql`
    query GetMyOrders($input: OrderInquiry!) {
        getMyOrders(input: $input) {
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

export const GET_MY_AGENT_ORDERS = gql`
    query GetAgentOrders($input: OrderInquiry!) {
        getAgentOrders(input: $input) {
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
            }
        }
    }
`;

/**************************
 *         FAQ        *
 *************************/

export const GET_FAQ = gql`
    query GetFaq($input: String!) {
        getFaq(input: $input) {
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
    }
`;

export const GET_FAQS = gql`
    query GetFaqs($input: FaqsInquiry!) {
        getFaqs(input: $input) {
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
 *         FOLLOW        *
 *************************/
export const GET_MEMBER_FOLLOWERS = gql`
    query GetMemberFollowers($input: FollowInquiry!) {
        getMemberFollowers(input: $input) {
            list {
                _id
                followingId
                followerId
                createdAt
                updatedAt
                meLiked {
                    memberId
                    likeRefId
                    myFavorite
                }
                meFollowed {
                    followingId
                    followerId
                    myFollowing
                }
                followerData {
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

export const GET_MEMBER_FOLLOWINGS = gql`
    query GetMemberFollowings($input: FollowInquiry!) {
        getMemberFollowings(input: $input) {
            list {
                _id
                followingId
                followerId
                createdAt
                updatedAt
                meLiked {
                    memberId
                    likeRefId
                    myFavorite
                }
                meFollowed {
                    followingId
                    followerId
                    myFollowing
                }
                followingData {
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
    }
`;