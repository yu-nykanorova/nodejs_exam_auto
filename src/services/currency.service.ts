import { config } from "../configs/config";
import { CurrencyEnum } from "../enums/currency.enum";
import {
    ICurrencyApiResponse,
    IExchangeRateData,
    IPricesAndRates,
} from "../interfaces/currency.interface";
import { ApiError } from "../errors/api.errors";
import { StatusCodesEnum } from "../enums/status-codes.enum";

class CurrencyService {
    private async getExchangeRates(): Promise<IExchangeRateData> {
        try {
            const response = await fetch(config.PRIVATBANK_API_URL);

            if (!response.ok) {
                throw new Error(`API server error: ${response.status}`);
            }
            const result: ICurrencyApiResponse = await response.json();

            const usd = result.find((item) => item.ccy === CurrencyEnum.USD);
            const eur = result.find((item) => item.ccy === CurrencyEnum.EUR);

            if (!usd || !eur) {
                throw new Error("Failed to receive currencies data from API");
            }

            return {
                EUR: Number(eur.sale),
                USD: Number(usd.sale),
            };
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async calculatePrices(
        initialPrice: number,
        initialCurrency: CurrencyEnum,
    ): Promise<IPricesAndRates> {
        let baseUAHPrice: number;
        const rates = await this.getExchangeRates();

        const exchangeRateUSD = rates.USD;
        const exchangeRateEUR = rates.EUR;

        switch (initialCurrency) {
            case CurrencyEnum.USD:
                baseUAHPrice = initialPrice * exchangeRateUSD;
                break;
            case CurrencyEnum.UAH:
                baseUAHPrice = initialPrice;
                break;
            case CurrencyEnum.EUR:
                baseUAHPrice = initialPrice * exchangeRateEUR;
                break;
            default:
                throw new ApiError(
                    "Wrong currency",
                    StatusCodesEnum.BAD_REQUEST,
                );
        }

        return {
            priceUAH: baseUAHPrice,
            priceUSD: baseUAHPrice / exchangeRateUSD,
            priceEUR: baseUAHPrice / exchangeRateEUR,
            exchangeRateUSD,
            exchangeRateEUR,
        };
    }
}

export const currencyService = new CurrencyService();
