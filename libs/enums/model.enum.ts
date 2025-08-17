export enum ModelBrand {
    TOYOTA = "TOYOTA",
    HONDA = "HONDA",
    HYUNDAI = "HYUNDAI",
    KIA = "KIA",
    CHEVROLET = "CHEVROLET",
    MERCEDES_BENZ = "MERCEDES_BENZ",
    BMW = "BMW",
    AUDI = "AUDI",
    VOLKSWAGEN = "VOLKSWAGEN",
    LEXUS = "LEXUS",
    FORD = "FORD",
    NISSAN = "NISSAN",
    TESLA = "TESLA",
    MAYBACH = "MAYBACH",
    PORSCHE = "PORSCHE",
    JEEP = "JEEP",
    MAZDA = "MAZDA",
    MITSUBISHI = "MITSUBISHI",
    SUZUKI = "SUZUKI",
    LAND_ROVER = "LAND_ROVER",
    INFINITI = "INFINITI",
    GENESIS = "GENESIS",
    OTHER = "OTHER"
}

export enum ModelStatus {
    PENDING = 'PENDING',           // Being edited
    LIVE = 'LIVE',             // Actively visible on
    SOLD = 'SOLD',             // Fully sold
    DELETE = 'DELETE',     // Hidden or removed
}

export enum ModelLocation {
    // USA
    NEW_YORK = 'NEW_YORK',
    LOS_ANGELES = 'LOS_ANGELES',
    CHICAGO = 'CHICAGO',
    HOUSTON = 'HOUSTON',

    // European Union
    BERLIN = 'BERLIN',
    PARIS = 'PARIS',
    ROME = 'ROME',
    MADRID = 'MADRID',

    // Uzbekistan
    TASHKENT = 'TASHKENT',
    SAMARKAND = 'SAMARKAND',
    BUKHARA = 'BUKHARA',
    NAMANGAN = 'NAMANGAN',

    // South Korea
    SEOUL = 'SEOUL',
    BUSAN = 'BUSAN',
    INCHEON = 'INCHEON',
    DAEGU = 'DAEGU',

    OTHER = 'OTHER' // for unlisted cities or international
}

export enum ModelCurrency {
    USD = 'USD',
    EUR = 'EUR',
    UZS = 'UZS',
}

export enum ModelColour {
    BLACK = 'BLACK',
    WHITE = 'WHITE',
    RED = 'RED',
    BLUE = 'BLUE',
    GREEN = 'GREEN',
    YELLOW = 'YELLOW',
    GREY = 'GREY',
    SILVER = 'SILVER',
    GOLD = 'GOLD',
    ORANGE = 'ORANGE',
    BROWN = 'BROWN',
    PURPLE = 'PURPLE',
    PINK = 'PINK',
    BEIGE = 'BEIGE',
    CREAM = 'CREAM',
    NAVY = 'NAVY',
    TAN = 'TAN',
    TURQUOISE = 'TURQUOISE',
    VIOLET = 'VIOLET',
}

export enum ModelTransmission {
    MANUAL = 'MANUAL',
    AUTOMATIC = 'AUTOMATIC',
}

export enum ModelFuelType {
    PETROL = 'PETROL',
    DIESEL = 'DIESEL',
    ELECTRIC = 'ELECTRIC',
    HYBRID = 'HYBRID',
}

export enum ModelBodyType {
    SEDAN = 'SEDAN',
    SUV = 'SUV',
    HATCHBACK = 'HATCHBACK',
    COUPE = 'COUPE',
    CONVERTIBLE = 'CONVERTIBLE',
    VAN = 'VAN',
    TRUCK = 'TRUCK'
}

export enum ModelOdoUnit {
    MILES = 'MILES',
    KILOMETERS = 'KILOMETERS',
}

export enum ModelULEZCompliance {
    COMPLIANT = 'COMPLIANT',
    EXEMPT = 'EXEMPT',
    NON_EXEMPT = 'NON_EXEMPT',
}