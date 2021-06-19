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

router.get(
    ROUTES.CATALOGUE.PRODUCT.GET,
    middlewares.validateSchema({ pathParamSchema: CommonSchema.resourcePathParam }),
    middlewares.auth,
    ProductController.createProduct,
);
export default router;
