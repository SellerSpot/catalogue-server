import { tenantDbServices } from '@sellerspot/database-models';
import { IBrandData, ICreateBrandRequest, IEditBrandRequest } from '@sellerspot/universal-types';

export class BrandService {
    static async getBrand(brandId: string): Promise<IBrandData> {
        const { BrandService: BrandDbService } = tenantDbServices.catalogue;
        const brand: IBrandData = await BrandDbService.getBrand(brandId);
        return brand;
    }

    static async searchBrand(query: string): Promise<IBrandData[]> {
        const { BrandService: BrandDbService } = tenantDbServices.catalogue;
        const matchedBrands: IBrandData[] = await BrandDbService.searchBrand(query);
        return matchedBrands;
    }

    static async getAllBrand(): Promise<IBrandData[]> {
        const { BrandService: BrandDbService } = tenantDbServices.catalogue;
        const allBrands: IBrandData[] = await BrandDbService.getAllBrand();
        return allBrands;
    }

    static async createBrand(newBrand: ICreateBrandRequest): Promise<IBrandData> {
        const { BrandService: BrandDbService } = tenantDbServices.catalogue;
        const brand: IBrandData = await BrandDbService.createBrand(newBrand);
        return brand;
    }

    static async editBrand(brandId: string, brand: IEditBrandRequest): Promise<IBrandData> {
        const { BrandService: BrandDbService } = tenantDbServices.catalogue;
        const editedBrand: IBrandData = await BrandDbService.editBrand(brandId, brand);
        return editedBrand;
    }

    static async deleteBrand(brandId: string): Promise<void> {
        const { BrandService: BrandDbService } = tenantDbServices.catalogue;
        await BrandDbService.deleteBrand(brandId);
    }
}
