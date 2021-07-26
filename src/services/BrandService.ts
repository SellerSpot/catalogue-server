import { IBrandData, ICreateBrandRequest, IEditBrandRequest } from '@sellerspot/universal-types';
import { tenantDbServices, tenantDbModels } from '@sellerspot/database-models';

type TBrandDoc = tenantDbModels.catalogueModels.IBrandDoc;

export class BrandService {
    static async getBrand(brandId: string): Promise<IBrandData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const brand: TBrandDoc = await catalogueDbService.getBrand(brandId);
        return BrandService.convertToBrandData(brand);
    }

    static async searchBrand(query: string): Promise<IBrandData[]> {
        const catalogueDbService = tenantDbServices.catalogue;
        const matchedBrands: TBrandDoc[] = await catalogueDbService.searchBrand(query);
        return matchedBrands.map((brand) => BrandService.convertToBrandData(brand));
    }

    static async getAllBrand(): Promise<IBrandData[]> {
        const catalogueDbService = tenantDbServices.catalogue;
        const brands: TBrandDoc[] = await catalogueDbService.getAllBrand();
        const allBrands: IBrandData[] = brands.map((brand) => ({ id: brand.id, name: brand.name }));
        return allBrands;
    }

    static async createBrand(newBrand: ICreateBrandRequest): Promise<IBrandData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const brand: TBrandDoc = await catalogueDbService.createBrand(newBrand);
        return BrandService.convertToBrandData(brand);
    }

    static async editBrand(brandId: string, brand: IEditBrandRequest): Promise<IBrandData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const editedBrand: TBrandDoc = await catalogueDbService.editBrand(brandId, brand);
        return BrandService.convertToBrandData(editedBrand);
    }

    static async deleteBrand(brandId: string): Promise<void> {
        const catalogueDbService = tenantDbServices.catalogue;
        await catalogueDbService.deleteBrand(brandId);
    }

    private static convertToBrandData(brand: TBrandDoc) {
        if (brand) {
            const { id, name } = brand;
            const brandData: IBrandData = { id, name };
            return brandData;
        }
        return null;
    }
}
