import { IBrandData, ICreateBrandRequest, IEditBrandRequest } from '@sellerspot/universal-types';
import { tenantDbServices, tenantDbModels } from '@sellerspot/database-models';

type TBrand = tenantDbModels.catalogueModels.IBrand;

export default class BrandService {
    static async show(brandId: string): Promise<IBrandData> {
        const { getBrand } = tenantDbServices.catalogue;
        const brand: TBrand = await getBrand(brandId);
        return BrandService.getHash(brand);
    }

    static async list(): Promise<IBrandData[]> {
        const { getAllBrand } = tenantDbServices.catalogue;
        const brands: TBrand[] = await getAllBrand();
        const allBrands: IBrandData[] = brands.map((brand) => ({ id: brand.id, name: brand.name }));
        return allBrands;
    }

    static async create(newBrand: ICreateBrandRequest): Promise<IBrandData> {
        const { createBrand } = tenantDbServices.catalogue;
        const brand: TBrand = await createBrand(newBrand);
        return BrandService.getHash(brand);
    }

    static async edit(brandId: string, brand: IEditBrandRequest): Promise<IBrandData> {
        const { editBrand } = tenantDbServices.catalogue;
        const editedBrand: TBrand = await editBrand(brandId, brand);
        return BrandService.getHash(editedBrand);
    }

    static async delete(brandId: string): Promise<void> {
        const { deleteBrand } = tenantDbServices.catalogue;
        await deleteBrand(brandId);
    }

    private static getHash(brand: TBrand) {
        if (brand) {
            const { id, name } = brand;
            const brandHash: IBrandData = { id, name };
            return brandHash;
        }
        return null;
    }
}
