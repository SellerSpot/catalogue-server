import Joi from 'joi';
import { RegexUtil } from '@sellerspot/universal-functions';
import {
    ICreateCategoryRequest,
    IEditCategoryChildrenOrderRequest,
    IEditCategoryPositionRequest,
    IEditCategoryRequest,
} from '@sellerspot/universal-types';

export class CategorySchema {
    static createCategory = Joi.object<ICreateCategoryRequest>({
        title: Joi.string().max(255).required(),
        parentId: Joi.string().regex(RegexUtil.OBJECT_ID).allow(null).required(),
    });

    static editChildrenOrder = Joi.object<IEditCategoryChildrenOrderRequest>({
        childrenOrder: Joi.array().items(Joi.string().regex(RegexUtil.OBJECT_ID).required()),
    });

    static editCategoryPosition = Joi.object<IEditCategoryPositionRequest>({
        newParentId: Joi.string().regex(RegexUtil.OBJECT_ID).allow(null).required(),
        oldParentId: Joi.string().regex(RegexUtil.OBJECT_ID).allow(null).required(),
    });

    static editCategory = Joi.object<IEditCategoryRequest>({
        title: Joi.string().max(255).required(),
    });
}
