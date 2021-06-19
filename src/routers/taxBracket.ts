import { ROUTES } from '@sellerspot/universal-types';
import { Router } from 'express';
import { TaxBracketController } from 'controllers/controllers';
import { middlewares } from '@sellerspot/universal-functions';
import { TaxBracketSchema, CommonSchema } from 'schemas/schemas';

const router = Router();

router.get(
    ROUTES.CATALOGUE.TAX_BRACKET_GET_ALL,
    middlewares.auth,
    TaxBracketController.getAllTaxBracket,
);

router.post(
    ROUTES.CATALOGUE.TAX_BRACKET_CREATE,
    middlewares.validateSchema({ bodySchema: TaxBracketSchema.createTaxBracket }),
    middlewares.auth,
    TaxBracketController.createTaxBracket,
);

router.post(
    ROUTES.CATALOGUE.TAX_GROUP_CREATE,
    middlewares.validateSchema({ bodySchema: TaxBracketSchema.createTaxGroup }),
    middlewares.auth,
    TaxBracketController.createTaxGroup,
);

export default router;
