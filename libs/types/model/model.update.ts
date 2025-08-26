import { ModelBodyType, ModelBrand, ModelColour, ModelCurrency, ModelFuelType, ModelLocation, ModelOdoUnit, ModelStatus, ModelTransmission, ModelULEZCompliance } from "../../enums/model.enum";

export interface ModelUpdate {
    _id: string;
    modelBrand?: ModelBrand;
    modelBodyType?: ModelBodyType;
    modelStatus?: ModelStatus;
    modelLocation?: ModelLocation;
    modelAddress?: string;
    modelTitle?: string;
    modelPrice?: number;
    modelCurrency?: ModelCurrency.USD;
    modelYear?: number;
    modelTransmission?: ModelTransmission;
    modelColour?: ModelColour;
    modelFuelType?: ModelFuelType;
    modelOdometer?: number;
    modelOdoUnit?: ModelOdoUnit;
    modelUlezCompliance?: ModelULEZCompliance;
    modelImages?: string[];
    modelDesc?: string;
    soldAt?: Date;
    deletedAt?: Date;
}