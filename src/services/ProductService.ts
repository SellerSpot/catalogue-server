import {
    ICreateProductRequest,
    IEditProductRequest,
    IProductData,
} from '@sellerspot/universal-types';
import { tenantDbModels, tenantDbServices } from '@sellerspot/database-models';

type ICategoryDoc = tenantDbModels.catalogueModels.ICategoryDoc;
type IProductDoc = tenantDbModels.catalogueModels.IProductDoc;
type IBrandDoc = tenantDbModels.catalogueModels.IBrandDoc;
type IStockUnitDoc = tenantDbModels.catalogueModels.IStockUnitDoc;

export class ProductService {
    static async createProduct(newProduct: ICreateProductRequest): Promise<IProductData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const product: IProductDoc = await catalogueDbService.createProduct(newProduct);
        return ProductService.convertToProductData(product);
    }

    static async editProduct(
        productId: string,
        editProductProps: IEditProductRequest,
    ): Promise<IProductData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const product: IProductDoc = await catalogueDbService.editProduct(
            productId,
            editProductProps,
        );
        return ProductService.convertToProductData(product);
    }

    static async getProduct(productId: string): Promise<IProductData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const product: IProductDoc = await catalogueDbService.getProduct(productId);
        return ProductService.convertToProductData(product);
    }

    static async getAllProduct(): Promise<IProductData[]> {
        const catalogueDbService = tenantDbServices.catalogue;
        const productList: IProductDoc[] = await catalogueDbService.getAllProduct();
        return productList.map((product) => ProductService.convertToProductData(product));
    }

    static async deleteProduct(productId: string): Promise<void> {
        const catalogueDbService = tenantDbServices.catalogue;
        await catalogueDbService.deleteProduct(productId);
    }

    static convertToProductData(product: IProductDoc): IProductData {
        if (product) {
            const { id, name, description, brand, category, barcode, stockUnit } = product;
            const productData: IProductData = { id, name, description, barcode };
            if (brand) {
                const { name: brandName, id: brandId } = <IBrandDoc>brand;
                productData.brand = {
                    id: brandId,
                    name: brandName,
                };
            }
            if (category) {
                const { title, id: categoryId } = <ICategoryDoc>category;
                productData.category = {
                    id: categoryId,
                    title,
                };
            }
            if (stockUnit) {
                const { name, id: stockUnitId, unit } = <IStockUnitDoc>stockUnit;
                productData.stockUnit = {
                    id: stockUnitId,
                    name,
                    unit,
                };
            }
            return productData;
        }
        return null;
    }
}
