import Joi from 'joi';
import { RegexUtil } from '@sellerspot/universal-functions';

export const resourcePathParam = Joi.object({
    id: Joi.string().regex(RegexUtil.OBJECT_ID).required(),
});
