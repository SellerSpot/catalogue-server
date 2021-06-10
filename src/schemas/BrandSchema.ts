import Joi from 'joi';
import { IEditBrandRequest, ICreateBrandRequest } from '@sellerspot/universal-types';

export default class BrandSchema {
    static createBrand = Joi.object<ICreateBrandRequest>({
        name: Joi.string().max(255).required(),
    });

    static editBrand = Joi.object<IEditBrandRequest>({
        name: Joi.string().max(255).required(),
    });
}
