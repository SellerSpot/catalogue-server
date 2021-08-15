import Joi from 'joi';
import { RegexUtil } from '@sellerspot/universal-functions';
import {
    ICreateTaxBracketRequest,
    ICreateTaxGroupRequest,
    IEditTaxBracketRequest,
    IEditTaxGroupRequest,
} from '@sellerspot/universal-types';

export class TaxBracketSchema {
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
        group: Joi.array().items(Joi.string().regex(RegexUtil.OBJECT_ID).required()),
    });

    static editTaxGroup = Joi.object<IEditTaxGroupRequest>({
        name: Joi.string().max(255).required(),
        group: Joi.array().items(Joi.string().regex(RegexUtil.OBJECT_ID).required()),
    });
}
