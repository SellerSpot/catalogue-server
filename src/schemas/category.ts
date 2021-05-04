import Joi from 'joi';
import { RegexUtil } from '@sellerspot/universal-functions';
import {} from '@sellerspot/universal-types';

export const createCategory = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    parentId: Joi.string().regex(RegexUtil.OBJECT_ID).optional(),
});

export const TCreateCategory = Joi;
