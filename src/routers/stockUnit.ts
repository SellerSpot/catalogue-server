import { Router } from 'express';
import { middlewares } from '@sellerspot/universal-functions';
import { ROUTES } from '@sellerspot/universal-types';
import { StockUnitSchema, CommonSchema } from 'schemas/schemas';
import { StockUnitController } from 'controllers/controllers';

const router = Router();

router.get(ROUTES.CATALOGUE.STOCK_UNIT_LIST, middlewares.auth, StockUnitController.getAllStockUnit);

router.get(
    ROUTES.CATALOGUE.STOCK_UNIT_GET,
    middlewares.validateSchema({ pathParamSchema: CommonSchema.resourcePathParam }),
    middlewares.auth,
    StockUnitController.getStockUnit,
);

router.post(
    ROUTES.CATALOGUE.STOCK_UNIT_CREATE,
    middlewares.validateSchema({ bodySchema: StockUnitSchema.createStockUnit }),
    middlewares.auth,
    StockUnitController.createStockUnit,
);

router.put(
    ROUTES.CATALOGUE.STOCK_UNIT_EDIT,
    middlewares.validateSchema({
        pathParamSchema: CommonSchema.resourcePathParam,
        bodySchema: StockUnitSchema.editStockUnit,
    }),
    middlewares.auth,
    StockUnitController.editStockUnit,
);

router.delete(
    ROUTES.CATALOGUE.STOCK_UNIT_DELETE,
    middlewares.validateSchema({ pathParamSchema: CommonSchema.resourcePathParam }),
    middlewares.auth,
    StockUnitController.deleteStockUnit,
);

export default router;
