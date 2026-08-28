export interface IAdvert {
    _id: string;
    title: string;
    brand: string;
    model: string;
    year: number;
    region: string;
    city: string;
    description: string;
    initialPrice: number;
    initialCurrency: Currency;
    priceUAH: number;
    priceUSD: number;
    priceEUR: number;
    exchangeRate: IExchangeRateData;
    status: AdvertStatus
    _ownerId: string;
    ownerContacts: IOwnerContacts;
    photo?: string;
    createdAt: string;
    updatedAt: string;
}

type Currency = 'UAH' | 'USD' | 'EUR';

type AdvertStatus = "pending" | "active" | "blocked" | "deleted" | "sold";

interface IExchangeRateData {
    EUR: number;
    USD: number;
    date: string;
}

interface IOwnerContacts {
    email: string;
    name: string;
    phone: string;
}

export interface IAdvertResponse
{
    totalItems: number;
    totalPages: number;
    prevPage: number;
    nextPage: number;
    data: IAdvert[];
}