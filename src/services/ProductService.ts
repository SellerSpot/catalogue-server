import { IProductData, IProductRequest } from '@sellerspot/universal-types';
import { tenantDbServices } from '@sellerspot/database-models';
import {
    IBrand,
    ICategoryDoc,
    IProduct,
} from '@sellerspot/database-models/dist/models/tenantDb/catalogueModels';

export class ProductService {
    static async create(newProduct: IProductRequest): Promise<IProductData> {
        const { createProduct } = tenantDbServices.catalogue;
        const product: IProduct = await createProduct(newProduct);
        return ProductService.getHash(product);
    }

    static getHash(product: IProduct): IProductData {
        if (product) {
            const { id, name, description, brand, category, barcode } = product;
            const productHash: IProductData = { id, name, description, barcode };
            if (brand) {
                const { name: brandName, id: brandId } = <IBrand>brand;
                productHash.brand = {
                    id: brandId,
                    name: brandName,
                };
            }
            if (category) {
                const { title, id: categoryId } = <ICategoryDoc>category;
                productHash.category = {
                    id: categoryId,
                    title,
                };
            }
            return productHash;
        }
        return null;
    }
}
