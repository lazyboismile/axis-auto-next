import { Direction } from '../../enums/common.enum';
import { ModelBodyType, ModelBrand, ModelColour, ModelCurrency, ModelLocation, ModelOdoUnit, ModelStatus, ModelTransmission, ModelULEZCompliance } from "../../enums/model.enum";



export interface ModelInput {
    modelBrand: ModelBrand;
    modelType: ModelBodyType;
    modelLocation: ModelLocation;
    modelAddress: string;
    modelTitle: string;
    modelPrice: number;
    modelYear: number;
    modelTransmission: ModelTransmission;
    modelOdometer: number;
    modelImages: string[];
    modelCurrency?: ModelCurrency;
    modelOdoUnit?: ModelOdoUnit;
    modelUlezCompliance?: ModelULEZCompliance;
    modelDesc?: string;
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
    modelTypeList: ModelBodyType[]
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