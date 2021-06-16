import Joi from 'joi';
import { RegexUtil } from '@sellerspot/universal-functions';
import {
    ICreateCategoryRequest,
    IEditCategorySiblingOrderRequest,
    IEditCategoryPositionRequest,
    IEditCategoryRequest,
} from '@sellerspot/universal-types';

export class CategorySchema {
    static createCategory = Joi.object<ICreateCategoryRequest>({
        title: Joi.string().max(255).required(),
        parentId: Joi.string().regex(RegexUtil.OBJECT_ID).optional(),
    });

    static editSiblingOrder = Joi.object<IEditCategorySiblingOrderRequest>({
        siblingOrder: Joi.array().items(Joi.string().regex(RegexUtil.OBJECT_ID).required()),
    });

    static editCategoryPosition = Joi.object<IEditCategoryPositionRequest>({
        newParentId: Joi.string().regex(RegexUtil.OBJECT_ID).required(),
        oldParentId: Joi.string().regex(RegexUtil.OBJECT_ID).required(),
    });

    static editCategory = Joi.object<IEditCategoryRequest>({
        title: Joi.string().max(255).required(),
    });
}
