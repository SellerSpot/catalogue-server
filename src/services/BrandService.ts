import { IBrandData, ICreateBrandRequest, IEditBrandRequest } from '@sellerspot/universal-types';
import { tenantDbServices, tenantDbModels } from '@sellerspot/database-models';

type TBrand = tenantDbModels.catalogueModels.IBrandDoc;

export class BrandService {
    static async getBrand(brandId: string): Promise<IBrandData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const brand: TBrand = await catalogueDbService.getBrand(brandId);
        return BrandService.convertToBrandData(brand);
    }

    static async getAllBrand(): Promise<IBrandData[]> {
        const catalogueDbService = tenantDbServices.catalogue;
        const brands: TBrand[] = await catalogueDbService.getAllBrand();
        const allBrands: IBrandData[] = brands.map((brand) => ({ id: brand.id, name: brand.name }));
        return allBrands;
    }

    static async createBrand(newBrand: ICreateBrandRequest): Promise<IBrandData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const brand: TBrand = await catalogueDbService.createBrand(newBrand);
        return BrandService.convertToBrandData(brand);
    }

    static async editBrand(brandId: string, brand: IEditBrandRequest): Promise<IBrandData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const editedBrand: TBrand = await catalogueDbService.editBrand(brandId, brand);
        return BrandService.convertToBrandData(editedBrand);
    }

    static async deleteBrand(brandId: string): Promise<void> {
        const catalogueDbService = tenantDbServices.catalogue;
        await catalogueDbService.deleteBrand(brandId);
    }

    private static convertToBrandData(brand: TBrand) {
        if (brand) {
            const { id, name } = brand;
            const brandData: IBrandData = { id, name };
            return brandData;
        }
        return null;
    }
}
