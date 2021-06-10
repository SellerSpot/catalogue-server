import Joi from 'joi';
import { RegexUtil } from '@sellerspot/universal-functions';

export default class CommonSchema {
    static resourcePathParam = Joi.object({
        id: Joi.string().regex(RegexUtil.OBJECT_ID).required(),
    });
}
