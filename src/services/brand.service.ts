import { IBrand } from "../interfaces/brand.interface";

class BrandService {
    public async getAllBrands(): Promise<IBrand[]> {
        return await brandRepository.getAllBrands();
    }

    public async createBrand(name: string): Promise<IBrand> {
        return await brandRepository.createBrand(name);
    }

    public async getBrandRequests() {
        return await brandRepository.getAllBrands();
    }

    public async createBrandRequest() {}

    public async updateBrandRequest() {}
}

export const brandService = new BrandService();
