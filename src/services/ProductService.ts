import { IProductData, IProductRequest, IStockUnitData } from '@sellerspot/universal-types';
import { tenantDbModels, tenantDbServices } from '@sellerspot/database-models';
import { IStockUnitDoc } from '../../.yalc/@sellerspot/database-models/dist/models/tenantDb/catalogueModels';

type ICategoryDoc = tenantDbModels.catalogueModels.ICategoryDoc;
type IProductDoc = tenantDbModels.catalogueModels.IProductDoc;
type IBrandDoc = tenantDbModels.catalogueModels.IBrandDoc;
export class ProductService {
    static async create(newProduct: IProductRequest): Promise<IProductData> {
        const { createProduct } = tenantDbServices.catalogue;
        const product: IProductDoc = await createProduct(newProduct);
        return ProductService.getHash(product);
    }

    static async edit(
        productId: string,
        editProductProps: Partial<IProductRequest>,
    ): Promise<IProductData> {
        const { editProduct } = tenantDbServices.catalogue;
        const product: IProductDoc = await editProduct(productId, editProductProps);
        return ProductService.getHash(product);
    }

    static async show(productId: string): Promise<IProductData> {
        const { getProduct } = tenantDbServices.catalogue;
        const product: IProductDoc = await getProduct(productId);
        return ProductService.getHash(product);
    }

    static async list(): Promise<IProductData[]> {
        const { getAllProduct } = tenantDbServices.catalogue;
        const productList: IProductDoc[] = await getAllProduct();
        return productList.map((product) => ProductService.getHash(product));
    }

    static async delete(productId: string): Promise<void> {
        const { deleteProduct } = tenantDbServices.catalogue;
        await deleteProduct(productId);
    }

    static getHash(product: IProductDoc): IProductData {
        if (product) {
            const { id, name, description, brand, category, barcode, stockUnit } = product;
            const productHash: IProductData = { id, name, description, barcode };
            if (brand) {
                const { name: brandName, id: brandId } = <IBrandDoc>brand;
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
            if (stockUnit) {
                const { name, id: stockUnitId } = <IStockUnitDoc>stockUnit;
                productHash.stockUnit = {
                    id: stockUnitId,
                    name,
                };
            }
            return productHash;
        }
        return null;
    }
}
