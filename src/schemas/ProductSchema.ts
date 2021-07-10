import Joi from 'joi';
import { IProductRequest } from '@sellerspot/universal-types';
import { RegexUtil } from '@sellerspot/universal-functions';

export class ProductSchema {
    static createProduct = Joi.object<IProductRequest>({
        name: Joi.string().max(255).required(),
        description: Joi.string().max(1000),
        barcode: Joi.string(),
        brand: Joi.string().regex(RegexUtil.OBJECT_ID),
        stockUnit: Joi.string().regex(RegexUtil.OBJECT_ID),
        category: Joi.string().regex(RegexUtil.OBJECT_ID),
    });

    static editProduct = ProductSchema.createProduct.keys({
        name: Joi.string().max(255),
    });
}
