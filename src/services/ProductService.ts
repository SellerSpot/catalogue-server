import { tenantDbServices } from '@sellerspot/database-models';
import {
    ICreateProductRequest,
    IEditProductRequest,
    IProductData,
} from '@sellerspot/universal-types';

export class ProductService {
    static async createProduct(newProduct: ICreateProductRequest): Promise<IProductData> {
        const { ProductService: ProductDbService } = tenantDbServices.catalogue;
        const createdProduct: IProductData = await ProductDbService.createProduct(newProduct);
        return createdProduct;
    }

    static async editProduct(
        productId: string,
        editProductProps: IEditProductRequest,
    ): Promise<IProductData> {
        const { ProductService: ProductDbService } = tenantDbServices.catalogue;
        const updatedProduct: IProductData = await ProductDbService.editProduct(
            productId,
            editProductProps,
        );
        return updatedProduct;
    }

    static async getProduct(productId: string): Promise<IProductData> {
        const { ProductService: ProductDbService } = tenantDbServices.catalogue;
        const product: IProductData = await ProductDbService.getProduct(productId);
        return product;
    }

    static async searchProduct(query: string): Promise<IProductData[]> {
        const { ProductService: ProductDbService } = tenantDbServices.catalogue;
        const matchedProducts: IProductData[] = await ProductDbService.searchProduct(query);
        return matchedProducts;
    }

    static async getAllProduct(): Promise<IProductData[]> {
        const { ProductService: ProductDbService } = tenantDbServices.catalogue;
        const allProducts: IProductData[] = await ProductDbService.getAllProduct();
        return allProducts;
    }

    static async deleteProduct(productId: string): Promise<void> {
        const { ProductService: ProductDbService } = tenantDbServices.catalogue;
        await ProductDbService.deleteProduct(productId);
    }
}
