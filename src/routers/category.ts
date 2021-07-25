import { Router } from 'express';
import { middlewares, RegexUtil } from '@sellerspot/universal-functions';
import { ROUTES } from '@sellerspot/universal-types';
import { CategorySchema, CommonSchema } from 'schemas/schemas';
import { CategoryController } from 'controllers/controllers';
import Joi from 'joi';

const router = Router();

const editChildrenOrderPathParamSchema = Joi.object({
    parentid: Joi.string().regex(RegexUtil.OBJECT_ID).required(),
});

router.get(
    ROUTES.CATALOGUE.CATEGORY.GET_ALL,
    middlewares.auth,
    CategoryController.getAllCategories,
);

router.get(
    ROUTES.CATALOGUE.CATEGORY.GET,
    middlewares.validateSchema({ pathParamSchema: CommonSchema.resourcePathParam }),
    middlewares.auth,
    CategoryController.getCategory,
);

router.post(
    ROUTES.CATALOGUE.CATEGORY.CREATE,
    middlewares.validateSchema({ bodySchema: CategorySchema.createCategory }),
    middlewares.auth,
    CategoryController.createCategory,
);

router.put(
    ROUTES.CATALOGUE.CATEGORY.EDIT_POSITION,
    middlewares.validateSchema({
        pathParamSchema: CommonSchema.resourcePathParam,
        bodySchema: CategorySchema.editCategoryPosition,
    }),
    middlewares.auth,
    CategoryController.editCategoryPosition,
);

router.put(
    ROUTES.CATALOGUE.CATEGORY.EDIT_CHILDREN_ORDER,
    middlewares.validateSchema({
        pathParamSchema: editChildrenOrderPathParamSchema,
        bodySchema: CategorySchema.editChildrenOrder,
    }),
    middlewares.auth,
    CategoryController.editCategoryChildrenOrder,
);

router.put(
    ROUTES.CATALOGUE.CATEGORY.EDIT,
    middlewares.validateSchema({
        pathParamSchema: CommonSchema.resourcePathParam,
        bodySchema: CategorySchema.editCategory,
    }),
    middlewares.auth,
    CategoryController.editCategory,
);

router.delete(
    ROUTES.CATALOGUE.CATEGORY.DELETE,
    middlewares.validateSchema({ pathParamSchema: CommonSchema.resourcePathParam }),
    middlewares.auth,
    CategoryController.deleteCategory,
);

export default router;
