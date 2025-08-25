import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const UPDATE_MEMBER_BY_ADMIN = gql`
    mutation UpdateMemberByAdmin($input: MemberUpdate!) {
        updateMemberByAdmin(input: $input) {
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

/**************************
 *        MODEL        *
 *************************/

export const UPDATE_MODEL_BY_ADMIN = gql`
    mutation UpdateModelByAdmin($input: ModelUpdate!) {
        updateModelByAdmin(input: $input) {
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

export const REMOVE_MODEL_BY_ADMIN = gql`
    mutation RemoveModelByAdmin($input: String!) {
        removeModelByAdmin(modelId: $input) {
            _id
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
 *        ORDER        *
 *************************/

export const UPDATE_ORDER = gql`
    mutation UpdateOrder($input: OrderUpdate!) {
        updateOrder(input: $input) {
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

export const REMOVE_ORDER_BY_ADMIN = gql`
    mutation RemoveOrderByAdmin($input: String!) {
        removeOrderByAdmin(orderId: $input) {
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
 *      FAQ     *
 *************************/

export const UPDATE_FAQ_BY_ADMIN = gql`
    mutation UpdateFaqByAdmin($input: FaqUpdate!) {
        updateFaqByAdmin(input: $input) {
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

export const REMOVE_FAQ_BY_ADMIN = gql`
    mutation RemoveFaqByAdmin($input: String!) {
        removeFaqByAdmin(faqId: $input) {
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
 *      BOARD-ARTICLE     *
 *************************/

export const UPDATE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation UpdateBoardArticleByAdmin($input: BoardArticleUpdate!) {
		updateBoardArticleByAdmin(input: $input) {
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

export const REMOVE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation RemoveBoardArticleByAdmin($input: String!) {
		removeBoardArticleByAdmin(articleId: $input) {
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
 *         COMMENT        *
 *************************/

export const REMOVE_COMMENT_BY_ADMIN = gql`
	mutation RemoveCommentByAdmin($input: String!) {
		removeCommentByAdmin(commentId: $input) {
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
