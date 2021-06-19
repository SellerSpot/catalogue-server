import { Router } from 'express';
import { middlewares } from '@sellerspot/universal-functions';
import { ROUTES } from '@sellerspot/universal-types';
import { CategorySchema, CommonSchema } from 'schemas/schemas';
import { CategoryController } from 'controllers/controllers';

const router = Router();

router.get(ROUTES.CATALOGUE.CATEGORY.LIST, middlewares.auth, CategoryController.getAllCategories);

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
    ROUTES.CATALOGUE.CATEGORY.EDIT_CATEGORY_POSITION,
    middlewares.validateSchema({
        pathParamSchema: CommonSchema.resourcePathParam,
        bodySchema: CategorySchema.editCategoryPosition,
    }),
    middlewares.auth,
    CategoryController.editCategoryPosition,
);

router.put(
    ROUTES.CATALOGUE.CATEGORY.EDIT_SIBLING_ORDER,
    middlewares.validateSchema({
        pathParamSchema: CommonSchema.resourcePathParam,
        bodySchema: CategorySchema.editSiblingOrder,
    }),
    middlewares.auth,
    CategoryController.editCategorySiblingOrder,
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
