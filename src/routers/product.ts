import { middlewares } from '@sellerspot/universal-functions';
import { ROUTES } from '@sellerspot/universal-types';
import { ProductSchema, CommonSchema } from 'schemas/schemas';
import { Router } from 'express';
import { ProductController } from 'controllers/controllers';

const router = Router();

router.post(
    ROUTES.CATALOGUE.PRODUCT.CREATE,
    middlewares.validateSchema({ bodySchema: ProductSchema.createProduct }),
    middlewares.auth,
    ProductController.createProduct,
);

router.put(
    ROUTES.CATALOGUE.PRODUCT.EDIT,
    middlewares.validateSchema({
        pathParamSchema: CommonSchema.resourcePathParam,
        bodySchema: ProductSchema.editProduct,
    }),
    middlewares.auth,
    ProductController.editProduct,
);

router.get(
    ROUTES.CATALOGUE.PRODUCT.SEARCH,
    middlewares.validateSchema({ queryParamSchema: CommonSchema.resourceQueryParam }),
    middlewares.auth,
    ProductController.searchProduct,
);

router.get(
    ROUTES.CATALOGUE.PRODUCT.GET,
    middlewares.validateSchema({ pathParamSchema: CommonSchema.resourcePathParam }),
    middlewares.auth,
    ProductController.getProduct,
);

router.get(ROUTES.CATALOGUE.PRODUCT.GET_ALL, middlewares.auth, ProductController.getAllProduct);

router.delete(ROUTES.CATALOGUE.PRODUCT.DELETE, middlewares.auth, ProductController.deleteProduct);

export default router;
