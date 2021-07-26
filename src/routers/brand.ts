import { Router } from 'express';
import { middlewares } from '@sellerspot/universal-functions';
import { ROUTES } from '@sellerspot/universal-types';
import { BrandSchema, CommonSchema } from 'schemas/schemas';
import { BrandController } from 'controllers/controllers';

const router = Router();

router.get(ROUTES.CATALOGUE.BRAND.GET_ALL, middlewares.auth, BrandController.getAllBrand);

router.get(
    ROUTES.CATALOGUE.BRAND.SEARCH,
    middlewares.validateSchema({ queryParamSchema: CommonSchema.resourceQueryParam }),
    middlewares.auth,
    BrandController.searchBrand,
);

router.get(
    ROUTES.CATALOGUE.BRAND.GET,
    middlewares.validateSchema({ pathParamSchema: CommonSchema.resourcePathParam }),
    middlewares.auth,
    BrandController.getBrand,
);

router.post(
    ROUTES.CATALOGUE.BRAND.CREATE,
    middlewares.validateSchema({ bodySchema: BrandSchema.createBrand }),
    middlewares.auth,
    BrandController.createBrand,
);

router.put(
    ROUTES.CATALOGUE.BRAND.EDIT,
    middlewares.validateSchema({
        pathParamSchema: CommonSchema.resourcePathParam,
        bodySchema: BrandSchema.editBrand,
    }),
    middlewares.auth,
    BrandController.editBrand,
);

router.delete(
    ROUTES.CATALOGUE.BRAND.DELETE,
    middlewares.validateSchema({ pathParamSchema: CommonSchema.resourcePathParam }),
    middlewares.auth,
    BrandController.deleteBrand,
);

export default router;
