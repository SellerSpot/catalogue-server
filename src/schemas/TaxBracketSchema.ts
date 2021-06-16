import Joi from 'joi';
import { ITaxBracketRequest, ITaxGroupRequest } from '@sellerspot/universal-types';
import { RegexUtil } from '@sellerspot/universal-functions';

export class TaxBracketSchema {
    static createTaxBracket = Joi.object<ITaxBracketRequest>({
        name: Joi.string().max(255).required(),
        rate: Joi.number().max(150).required(),
    });
    static createTaxGroup = Joi.object<ITaxGroupRequest>({
        name: Joi.string().max(255).required(),
        bracket: Joi.array().items(Joi.string().regex(RegexUtil.OBJECT_ID).required()),
    });
}
