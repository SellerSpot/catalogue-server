import {
    ICreateProductRequest,
    ICreateProductResponse,
    IEditProductRequest,
    IEditProductResponse,
    IGetAllProductResponse,
    IGetProductResponse,
    STATUS_CODE,
} from '@sellerspot/universal-types';
import { RequestHandler } from 'express';
import { ProductService } from 'services/ProductService';

export class ProductController {
    static createProduct: RequestHandler = async (req, res, _) => {
        const productProps = <ICreateProductRequest>req.body;
        const product = await ProductService.createProduct(productProps);
        res.status(STATUS_CODE.CREATED).json(<ICreateProductResponse>{
            status: true,
            data: product,
        });
    };

    static editProduct: RequestHandler = async (req, res, _) => {
        const productProps = <IEditProductRequest>req.body;
        const productId = <string>req.params.id;
        const product = await ProductService.editProduct(productId, productProps);
        res.status(STATUS_CODE.OK).json(<IEditProductResponse>{ status: true, data: product });
    };

    static getProduct: RequestHandler = async (req, res, _) => {
        const product = await ProductService.getProduct(req.params.id);
        res.status(STATUS_CODE.OK).json(<IGetProductResponse>{ status: true, data: product });
    };

    static getAllProduct: RequestHandler = async (req, res, _) => {
        const productList = await ProductService.getAllProduct();
        res.status(STATUS_CODE.OK).json(<IGetAllProductResponse>{
            status: true,
            data: productList,
        });
    };

    static deleteProduct: RequestHandler = async (req, res) => {
        await ProductService.deleteProduct(req.params.id);
        res.sendStatus(STATUS_CODE.NO_CONTENT);
    };
}
