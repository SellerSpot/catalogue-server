import { Router } from 'express';
import { middlewares } from '@sellerspot/universal-functions';
import { dbMiddlewares } from '@sellerspot/database-models';
import { ROUTES } from '@sellerspot/universal-types';
import { categorySchema, resourcePathParam } from 'schemas/schema';
import { categoryController } from 'controllers/controller';

const router = Router();

router.get(
    ROUTES.CATALOGUE.CATAGORY.ACTION.LIST,
    middlewares.auth,
    dbMiddlewares.setTenantDb,
    categoryController.getAllCategories,
);

router.get(
    ROUTES.CATALOGUE.CATAGORY.ACTION.GET,
    middlewares.validateSchema({ pathParamSchema: resourcePathParam }),
    middlewares.auth,
    dbMiddlewares.setTenantDb,
    categoryController.getCategory,
);

router.post(
    ROUTES.CATALOGUE.CATAGORY.ACTION.CREATE,
    middlewares.validateSchema({ bodySchema: categorySchema.createCategory }),
    middlewares.auth,
    dbMiddlewares.setTenantDb,
    categoryController.createCategory,
);

router.put(
    ROUTES.CATALOGUE.CATAGORY.ACTION.EDIT_CATEGORY_POSITION,
    middlewares.validateSchema({
        pathParamSchema: resourcePathParam,
        bodySchema: categorySchema.editCategoryPosition,
    }),
    middlewares.auth,
    dbMiddlewares.setTenantDb,
    categoryController.editCategoryPosition,
);

router.put(
    ROUTES.CATALOGUE.CATAGORY.ACTION.EDIT_SIBLING_ORDER,
    middlewares.validateSchema({
        pathParamSchema: resourcePathParam,
        bodySchema: categorySchema.editSiblingOrder,
    }),
    middlewares.auth,
    dbMiddlewares.setTenantDb,
    categoryController.editCategorySiblingOrder,
);

router.put(
    ROUTES.CATALOGUE.CATAGORY.ACTION.EDIT,
    middlewares.validateSchema({
        pathParamSchema: resourcePathParam,
        bodySchema: categorySchema.editCategory,
    }),
    middlewares.auth,
    dbMiddlewares.setTenantDb,
    categoryController.editCategory,
);

router.delete(
    ROUTES.CATALOGUE.CATAGORY.ACTION.DELETE,
    middlewares.validateSchema({ pathParamSchema: resourcePathParam }),
    middlewares.auth,
    dbMiddlewares.setTenantDb,
    categoryController.deleteCategory,
);

export default router;
