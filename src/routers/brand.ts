import { Router } from 'express';
import { middlewares } from '@sellerspot/universal-functions';
import { ROUTES } from '@sellerspot/universal-types';
import { brandSchema, resourcePathParam } from 'schemas/schema';
import { brandController } from 'controllers/controller';

const router = Router();

router.get(ROUTES.CATALOGUE.BRAND_LIST, middlewares.auth, brandController.getAllBrand);

router.get(
    ROUTES.CATALOGUE.BRAND_GET,
    middlewares.validateSchema({ pathParamSchema: resourcePathParam }),
    middlewares.auth,
    brandController.getBrand,
);

router.post(
    ROUTES.CATALOGUE.BRAND_CREATE,
    middlewares.validateSchema({ bodySchema: brandSchema.createBrand }),
    middlewares.auth,
    brandController.createBrand,
);

router.put(
    ROUTES.CATALOGUE.BRAND_EDIT,
    middlewares.validateSchema({
        pathParamSchema: resourcePathParam,
        bodySchema: brandSchema.editBrand,
    }),
    middlewares.auth,
    brandController.editBrand,
);

router.delete(
    ROUTES.CATALOGUE.BRAND_DELETE,
    middlewares.validateSchema({ pathParamSchema: resourcePathParam }),
    middlewares.auth,
    brandController.deleteBrand,
);

export default router;
