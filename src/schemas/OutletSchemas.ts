import Joi from 'joi';
import { ICreateOutletRequest, IEditOutletRequest } from '@sellerspot/universal-types';

export class OutletSchema {
    static createOutlet = Joi.object<ICreateOutletRequest>({
        name: Joi.string().max(255).required(),
        address: Joi.string().required(),
    });

    static editOutlet = Joi.object<IEditOutletRequest>({
        name: Joi.string().max(255).required(),
        address: Joi.string().required(),
    });
}
