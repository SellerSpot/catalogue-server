import Joi from 'joi';
import { ICreateTaxBracketRequest, ICreateTaxGroupRequest } from '@sellerspot/universal-types';
import { RegexUtil } from '@sellerspot/universal-functions';

export class TaxBracketSchema {
    static createTaxBracket = Joi.object<ICreateTaxBracketRequest>({
        name: Joi.string().max(255).required(),
        rate: Joi.number().max(150).required(),
    });
    static createTaxGroup = Joi.object<ICreateTaxGroupRequest>({
        name: Joi.string().max(255).required(),
        bracket: Joi.array().items(Joi.string().regex(RegexUtil.OBJECT_ID).required()),
    });
}
