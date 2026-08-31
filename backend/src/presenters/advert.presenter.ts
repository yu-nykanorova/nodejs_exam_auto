import { config } from "../configs/config";
import { IAdvertPublic, IAdvertResult } from "../interfaces/advert.interface";

class AdvertPresenter {
    public toPublicResDto(advert: IAdvertResult): IAdvertPublic {
        return {
            _id: advert._id,
            title: advert.title,
            brand: advert.brand,
            model: advert.model,
            year: advert.year,
            region: advert.region,
            city: advert.city,
            description: advert.description,
            initialPrice: advert.initialPrice,
            initialCurrency: advert.initialCurrency,
            priceUAH: advert.priceUAH,
            priceUSD: advert.priceUSD,
            priceEUR: advert.priceEUR,
            _ownerId: advert._ownerId,
            ownerContacts: advert.ownerContacts,
            exchangeRate: advert.exchangeRate,
            photo: advert.photo
                ? `${config.AWS_S3_ENDPOINT}/${advert.photo}`
                : undefined,
            status: advert.status,
            attemptModerate: advert.attemptModerate,
            createdAt: advert.createdAt.toString(),
            updatedAt: advert.updatedAt.toString(),
        };
    }
}

export const advertPresenter = new AdvertPresenter();
