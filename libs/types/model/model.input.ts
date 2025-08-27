import { Direction } from '../../enums/common.enum';
import { ModelBodyType, ModelBrand, ModelColour, ModelCurrency, ModelFuelType, ModelLocation, ModelOdoUnit, ModelStatus, ModelTransmission, ModelULEZCompliance } from "../../enums/model.enum";



export interface ModelInput {
    modelBrand: ModelBrand;
    modelType: ModelBodyType;
    modelTitle: string;
    modelPrice: number;
    modelYear: number;
    modelLocation: ModelLocation;
    modelAddress: string;
    modelCurrency?: ModelCurrency;
    modelColour?: ModelColour;
    modelTransmission?: ModelTransmission;
    modelFuelType?: ModelFuelType;
    modelOdometer: number;
    modelOdoUnit?: ModelOdoUnit;
    modelUlezCompliance?: ModelULEZCompliance;
    modelDesc?: string;
    modelImages: string[];
    memberId?: string;
}

interface PISearch {
    memberId?: string;
    brandList?: ModelBrand[];
    locationList?: ModelLocation[];
    typeList?: ModelBodyType[];
    colourList?: ModelColour[];
    transmissionList?: ModelTransmission[];
    options?: String[];
    pricesRange?: Range;
    periodsRange?: PeriodsRange;
    odoMeterRange?: OdoMeterRange;
    text?: string;
}

export interface ModelsInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: PISearch;
}

interface APISearch {
    modelStatus?: ModelStatus;
}

export interface AgentModelsInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: APISearch;
}

interface ALPISearch {
    modelStatus?: ModelStatus;
    modelBrandList?: ModelBrand[];
    modelTypeList?: ModelBodyType[]
    modelLocationList?: ModelLocation[];
}

export interface AllModelsInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: ALPISearch;
}

interface OdoMeterRange {
    start: Date | number;
    end: Date | number;
}

interface Range {
    start: number;
    end: number;
}

interface PeriodsRange {
    start: Date | number;
    end: Date | number;
}