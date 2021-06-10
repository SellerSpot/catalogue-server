import Joi from 'joi';
import { IEditBrandRequest, ICreateBrandRequest } from '@sellerspot/universal-types';

export const createBrand = Joi.object<ICreateBrandRequest>({
    name: Joi.string().max(255).required(),
});

export const editBrand = Joi.object<IEditBrandRequest>({
    name: Joi.string().max(255).required(),
});
