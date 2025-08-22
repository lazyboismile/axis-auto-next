import { ModelBodyType, ModelBrand, ModelColour, ModelCurrency, ModelFuelType, ModelLocation, ModelOdoUnit, ModelStatus, ModelTransmission, ModelULEZCompliance } from "../../enums/model.enum";
import { Member } from "../member/member";

export interface MeLiked {
    memberId: string;
    likeRefId: string;
    myFavorite: boolean;
}

export interface TotalCounter {
    total: number;
}

export interface Model {
    _id: string;
    modelBrand: ModelBrand;
    modelType: ModelBodyType;
    modelStatus: ModelStatus;
    modelLocation: ModelLocation;
    modelAddress: string;
    modelTitle: string;
    modelYear: number;
    modelPrice: number;
    modelCurrency: ModelCurrency;
    modelColour: ModelColour;
    modelTransmission: ModelTransmission;
    modelFuelType: ModelFuelType;
    modelOdoMeter: number;
    modelOdoUnit: ModelOdoUnit;
    modelUlezCompliance: ModelULEZCompliance;
    modelDesc: string;
    modelViews: number;
    modelLikes: number;
    modelComments: number;
    modelRank: number;
    modelImages: string[];
    memberId: string;
    soldAt?: Date;
    deletedAt?: Date;
    constructedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    /** from aggregation **/
    meLiked?: MeLiked[];
    memberData?: Member;
}

export interface Models {
    list: Model[];
    metaCounter: TotalCounter[];
}