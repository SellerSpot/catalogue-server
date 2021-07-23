import { ROUTES } from '@sellerspot/universal-types';
import { Router } from 'express';
import { TaxBracketController } from 'controllers/controllers';
import { middlewares } from '@sellerspot/universal-functions';
import { CommonSchema, TaxSettingSchema } from 'schemas/schemas';

const router = Router();

// tax bracket
router.get(
    ROUTES.CATALOGUE.TAX_BRACKET.GET_ALL_BRACKET,
    middlewares.auth,
    TaxBracketController.getAllTaxBracket,
);

router.get(
    ROUTES.CATALOGUE.TAX_BRACKET.GET_BRACKET,
    middlewares.validateSchema({
        pathParamSchema: CommonSchema.resourcePathParam,
    }),
    middlewares.auth,
    TaxBracketController.getTaxBracket,
);

router.post(
    ROUTES.CATALOGUE.TAX_BRACKET.CREATE_BRACKET,
    middlewares.validateSchema({ bodySchema: TaxSettingSchema.createTaxBracket }),
    middlewares.auth,
    TaxBracketController.createTaxBracket,
);

router.put(
    ROUTES.CATALOGUE.TAX_BRACKET.EDIT_BRACKET,
    middlewares.validateSchema({
        pathParamSchema: CommonSchema.resourcePathParam,
        bodySchema: TaxSettingSchema.editTaxBracket,
    }),
    middlewares.auth,
    TaxBracketController.editTaxBracket,
);

router.delete(
    ROUTES.CATALOGUE.TAX_BRACKET.DELETE_BRACKET,
    middlewares.validateSchema({
        pathParamSchema: CommonSchema.resourcePathParam,
    }),
    middlewares.auth,
    TaxBracketController.deleteTaxBracket,
);

export default router;