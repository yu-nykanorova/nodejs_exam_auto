import {
    IAdvert,
    IAdvertCreateDTO,
    IAdvertQuery,
    IAdvertUpdateDTO,
} from "../interfaces/advert.interface";

class AdvertRepository {
    public async getAllAdverts(query: IAdvertQuery): Promise<IAdvert[]> {}

    public async getUserAdverts(userId: string): Promise<IAdvert[]> {}

    public async createAdvert(dto: IAdvertCreateDTO): Promise<IAdvert> {}

    public async getById(id: string): Promise<IAdvert> {}

    public async updateById(
        id: string,
        dto: IAdvertUpdateDTO,
    ): Promise<IAdvert> {}

    public async deleteById(id: string): Promise<void> {}
}

export const advertRepository = new AdvertRepository();
