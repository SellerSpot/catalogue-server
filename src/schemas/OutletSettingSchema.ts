import Joi from 'joi';
import { RegexUtil } from '@sellerspot/universal-functions';
import { IUpdateOutletSettingRequest } from '@sellerspot/universal-types';

export class OutletSettingSchema {
    static updateOutlet = Joi.object<IUpdateOutletSettingRequest>({
        defaultOutlet: Joi.string().regex(RegexUtil.OBJECT_ID).required(),
    });
}
