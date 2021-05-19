import { Router } from 'express';
import { middlewares } from '@sellerspot/universal-functions';
import { ROUTES } from '@sellerspot/universal-types';
import { categorySchema, resourcePathParam } from 'schemas/schema';
import { categoryController } from 'controllers/controller';

const router = Router();

router.get(ROUTES.CATALOGUE.CATAGORY_LIST, middlewares.auth, categoryController.getAllCategories);

router.get(
    ROUTES.CATALOGUE.CATAGORY_GET,
    middlewares.validateSchema({ pathParamSchema: resourcePathParam }),
    middlewares.auth,
    categoryController.getCategory,
);

router.post(
    ROUTES.CATALOGUE.CATAGORY_CREATE,
    middlewares.validateSchema({ bodySchema: categorySchema.createCategory }),
    middlewares.auth,
    categoryController.createCategory,
);

router.put(
    ROUTES.CATALOGUE.CATAGORY_EDIT_CATEGORY_POSITION,
    middlewares.validateSchema({
        pathParamSchema: resourcePathParam,
        bodySchema: categorySchema.editCategoryPosition,
    }),
    middlewares.auth,
    categoryController.editCategoryPosition,
);

router.put(
    ROUTES.CATALOGUE.CATAGORY_EDIT_SIBLING_ORDER,
    middlewares.validateSchema({
        pathParamSchema: resourcePathParam,
        bodySchema: categorySchema.editSiblingOrder,
    }),
    middlewares.auth,
    categoryController.editCategorySiblingOrder,
);

router.put(
    ROUTES.CATALOGUE.CATAGORY_EDIT,
    middlewares.validateSchema({
        pathParamSchema: resourcePathParam,
        bodySchema: categorySchema.editCategory,
    }),
    middlewares.auth,
    categoryController.editCategory,
);

router.delete(
    ROUTES.CATALOGUE.CATAGORY_DELETE,
    middlewares.validateSchema({ pathParamSchema: resourcePathParam }),
    middlewares.auth,
    categoryController.deleteCategory,
);

export default router;
