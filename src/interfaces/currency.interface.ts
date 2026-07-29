export type ICurrencyApiResponse = ICurrencyData[];

export interface ICurrencyData {
    ccy: string;
    base_ccy: string;
    buy: string;
    sale: string;
}

export interface IExchangeRateData {
    EUR: number;
    USD: number;
}

export interface IPricesAndRates {
    priceUAH: number;
    priceUSD: number;
    priceEUR: number;
    exchangeRateUSD: number;
    exchangeRateEUR: number;
}
