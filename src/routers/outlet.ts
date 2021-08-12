import { Router } from 'express';
import { middlewares } from '@sellerspot/universal-functions';
import { ROUTES } from '@sellerspot/universal-types';
import OutletController from '../controllers/OutletController';
import { CommonSchema, OutletSchema } from '../schemas/schemas';

const router = Router();

router.get(ROUTES.CATALOGUE.OUTLET.GET_ALL, middlewares.auth, OutletController.getAllOutlet);

router.get(
    ROUTES.CATALOGUE.OUTLET.SEARCH,
    middlewares.validateSchema({ queryParamSchema: CommonSchema.resourceQueryParam }),
    middlewares.auth,
    OutletController.searchOutlet,
);

router.get(
    ROUTES.CATALOGUE.OUTLET.GET,
    middlewares.validateSchema({ pathParamSchema: CommonSchema.resourcePathParam }),
    middlewares.auth,
    OutletController.getOutlet,
);

router.post(
    ROUTES.CATALOGUE.OUTLET.CREATE,
    middlewares.validateSchema({ bodySchema: OutletSchema.createOutlet }),
    middlewares.auth,
    OutletController.createOutlet,
);

router.put(
    ROUTES.CATALOGUE.OUTLET.EDIT,
    middlewares.validateSchema({
        pathParamSchema: CommonSchema.resourcePathParam,
        bodySchema: OutletSchema.editOutlet,
    }),
    middlewares.auth,
    OutletController.editOutlet,
);

router.delete(
    ROUTES.CATALOGUE.OUTLET.DELETE,
    middlewares.validateSchema({ pathParamSchema: CommonSchema.resourcePathParam }),
    middlewares.auth,
    OutletController.deleteOutlet,
);

export default router;
