import { IProductRequest, STATUS_CODE, IProductResponse } from '@sellerspot/universal-types';
import { RequestHandler } from 'express';
import { ProductService } from 'services/ProductService';

export class ProductController {
    static createProduct: RequestHandler = async (req, res, _) => {
        const productProps = <IProductRequest>req.body;
        const product = await ProductService.create(productProps);
        res.status(STATUS_CODE.CREATED).json(<IProductResponse>{ status: true, data: product });
    };
    static getProduct: RequestHandler = async (req, res, _) => {
        const product = await ProductService.show(req.params.id);
        res.status(STATUS_CODE.CREATED).json(<IProductResponse>{ status: true, data: product });
    };
}
