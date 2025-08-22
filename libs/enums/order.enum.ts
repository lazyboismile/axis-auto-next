
export enum OrderStatus {
    PENDING = 'PENDING',       // Order placed, awaiting confirmation/payment
    PAID = 'PAID',             // Payment successful
    PROCESSING = 'PROCESSING', // Admin is handling delivery or verification
    COMPLETED = 'COMPLETED',   // Order fully delivered/finalized
    CANCELLED = 'CANCELLED',   // User or admin cancelled
}

export enum PaymentMethod {
    CARD = 'CARD',
    PAYPAL = 'PAYPAL',
    CASH = 'CASH',
    BANK_TRANSFER = 'BANK_TRANSFER',
    UZCARD = 'UZCARD',
    HUMO = 'HUMO',
}
