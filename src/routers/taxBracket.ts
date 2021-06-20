import { ROUTES } from '@sellerspot/universal-types';
import { Router } from 'express';
import { TaxBracketController } from 'controllers/controllers';
import { middlewares } from '@sellerspot/universal-functions';
import { TaxBracketSchema } from 'schemas/schemas';

const router = Router();

router.get(
    ROUTES.CATALOGUE.TAX_BRACKET.GET_ALL,
    middlewares.auth,
    TaxBracketController.getAllTaxBracket,
);

router.post(
    ROUTES.CATALOGUE.TAX_BRACKET.CREATE,
    middlewares.validateSchema({ bodySchema: TaxBracketSchema.createTaxBracket }),
    middlewares.auth,
    TaxBracketController.createTaxBracket,
);

router.post(
    ROUTES.CATALOGUE.TAX_BRACKET.CREATE_GROUP,
    middlewares.validateSchema({ bodySchema: TaxBracketSchema.createTaxGroup }),
    middlewares.auth,
    TaxBracketController.createTaxGroup,
);

export default router;
