import Joi from 'joi';
import { ICreateStockUnitRequest, IEditStockUnitRequest } from '@sellerspot/universal-types';

export class StockUnitSchema {
    static createStockUnit = Joi.object<ICreateStockUnitRequest>({
        name: Joi.string().max(255).required(),
        unit: Joi.string().max(255).required(),
    });

    static editStockUnit = Joi.object<IEditStockUnitRequest>({
        name: Joi.string().max(255).required(),
        unit: Joi.string().max(255).required(),
    });
}
