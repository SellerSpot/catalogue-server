import Joi from 'joi';
import {
    ICreateTaxBracketRequest,
    ICreateTaxGroupRequest,
    IEditTaxBracketRequest,
} from '@sellerspot/universal-types';
import { RegexUtil } from '@sellerspot/universal-functions';

export class TaxSettingSchema {
    // tax bracket

    static createTaxBracket = Joi.object<ICreateTaxBracketRequest>({
        name: Joi.string().max(255).required(),
        rate: Joi.number().max(100).required(),
    });
    static editTaxBracket = Joi.object<IEditTaxBracketRequest>({
        name: Joi.string().max(255).required(),
        rate: Joi.number().max(100).required(),
    });

    // tax group
    static createTaxGroup = Joi.object<ICreateTaxGroupRequest>({
        name: Joi.string().max(255).required(),
        bracket: Joi.array().items(Joi.string().regex(RegexUtil.OBJECT_ID).required()),
    });
}