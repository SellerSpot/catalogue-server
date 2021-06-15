import { IProductRequest, STATUS_CODE } from '@sellerspot/universal-types';
import { RequestHandler } from 'express';
import { ProductService } from 'services/ProductService';

export class ProductController {
    static createProduct: RequestHandler = async (req, res, _) => {
        const productProps = <IProductRequest>req.body;
        const product = await ProductService.create(productProps);
        res.status(STATUS_CODE.CREATED).json(product);
    };
}
