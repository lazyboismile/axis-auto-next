import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const SIGN_UP = gql`
    mutation Signup($input: MemberInput!) {
        signup(input: $input) {
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
`;

export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
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
`;

export const UPDATE_MEMBER = gql`
    mutation UpdateMember($input: MemberUpdate!) {
        updateMember(input: $input) {
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
`;

export const LIKE_TARGET_MEMBER = gql`
    mutation LikeTargetMember($input: String!) {
        likeTargetMember(memberId: $input) {
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
`;

/**************************
 *        MODEL        *
 *************************/

export const CREATE_MODEL = gql`
    mutation CreateModel($input: ModelInput!) {
        createModel(input: $input) {
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
    }
`;

export const UPDATE_MODEL = gql`
    mutation UpdateModel($input: ModelUpdate!) {
        updateModel(input: $input) {
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
    }
`;

export const LIKE_TARGET_MODEL = gql`
    mutation LikeTargetModel($input: String!) {
        likeTargetModel(modelId: $input) {
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
    }
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const CREATE_BOARD_ARTICLE = gql`
	mutation CreateBoardArticle($input: BoardArticleInput!) {
		createBoardArticle(input: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_BOARD_ARTICLE = gql`
	mutation UpdateBoardArticle($input: BoardArticleUpdate!) {
		updateBoardArticle(input: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const LIKE_TARGET_BOARD_ARTICLE = gql`
	mutation LikeTargetBoardArticle($input: String!) {
		likeTargetBoardArticle(articleId: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         ORDER        *
 *************************/

export const CREATE_ORDER = gql`
    mutation CreateOrder($input: OrderInput!) {
        createOrder(input: $input) {
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
        }
    }
`;

/**************************
 *         FAQ        *
 *************************/

export const CREATE_FAQ = gql`
    mutation CreateFaq($input: FaqInput!) {
        createFaq(input: $input) {
            _id
            faqCategory
            faqStatus
            subject
            content
            writer
            createdAt
            updatedAt
        }
    }
`;

/**************************
 *         COMMENT        *
 *************************/

export const CREATE_COMMENT = gql`
	mutation CreateComment($input: CommentInput!) {
		createComment(input: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_COMMENT = gql`
	mutation UpdateComment($input: CommentUpdate!) {
		updateComment(input: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         FOLLOW        *
 *************************/

export const SUBSCRIBE = gql`
	mutation Subscribe($input: String!) {
		subscribe(input: $input) {
			_id
			followingId
			followerId
			createdAt
			updatedAt
		}
	}
`;

export const UNSUBSCRIBE = gql`
	mutation Unsubscribe($input: String!) {
		unsubscribe(input: $input) {
			_id
			followingId
			followerId
			createdAt
			updatedAt
		}
	}
`;