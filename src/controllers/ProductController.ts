import {
    IProductRequest,
    IGetAllProductResponse,
    STATUS_CODE,
    IProductResponse,
} from '@sellerspot/universal-types';
import { RequestHandler } from 'express';
import { ProductService } from 'services/ProductService';

export class ProductController {
    static createProduct: RequestHandler = async (req, res, _) => {
        const productProps = <IProductRequest>req.body;
        const product = await ProductService.create(productProps);
        res.status(STATUS_CODE.CREATED).json(<IProductResponse>{ status: true, data: product });
    };

    static editProduct: RequestHandler = async (req, res, _) => {
        const productProps = <Partial<IProductRequest>>req.body;
        const productId = <string>req.params.id;
        const product = await ProductService.edit(productId, productProps);
        res.status(STATUS_CODE.OK).json(<IProductResponse>{ status: true, data: product });
    };

    static getProduct: RequestHandler = async (req, res, _) => {
        const product = await ProductService.show(req.params.id);
        res.status(STATUS_CODE.OK).json(<IProductResponse>{ status: true, data: product });
    };

    static getAllProduct: RequestHandler = async (req, res, _) => {
        const productList = await ProductService.list();
        res.status(STATUS_CODE.OK).json(<IGetAllProductResponse>{
            status: true,
            data: productList,
        });
    };

    static deleteProduct: RequestHandler = async (req, res) => {
        await ProductService.delete(req.params.id);
        res.sendStatus(STATUS_CODE.NO_CONTENT);
    };
}
