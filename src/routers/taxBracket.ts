import { TaxBracketController } from 'controllers/controllers';
import { Router } from 'express';
import { CommonSchema, TaxBracketSchema } from 'schemas/schemas';
import { middlewares } from '@sellerspot/universal-functions';
import { ROUTES } from '@sellerspot/universal-types';

const router = Router();

router.get(
    ROUTES.CATALOGUE.TAX_BRACKET.GET_ALL_BRACKET_AND_GROUPS,
    middlewares.validateSchema({
        queryParamSchema: CommonSchema.resourceQueryParam,
    }),
    middlewares.auth,
    TaxBracketController.getAllBracketsAndGroups,
);

router.get(
    ROUTES.CATALOGUE.TAX_BRACKET.SEARCH_ALL_BRACKET_AND_GROUP,
    middlewares.validateSchema({
        queryParamSchema: CommonSchema.resourceQueryParam,
    }),
    middlewares.auth,
    TaxBracketController.searchAllBracketAndGroup,
);

// tax groups
router.get(
    ROUTES.CATALOGUE.TAX_BRACKET.SEARCH_GROUP,
    middlewares.validateSchema({
        queryParamSchema: CommonSchema.resourceQueryParam,
    }),
    middlewares.auth,
    TaxBracketController.searchGroup,
);

router.get(
    ROUTES.CATALOGUE.TAX_BRACKET.GET_ALL_GROUP,
    middlewares.auth,
    TaxBracketController.getAllGroup,
);

router.get(
    ROUTES.CATALOGUE.TAX_BRACKET.GET_GROUP,
    middlewares.validateSchema({
        pathParamSchema: CommonSchema.resourcePathParam,
    }),
    middlewares.auth,
    TaxBracketController.getGroup,
);

router.post(
    ROUTES.CATALOGUE.TAX_BRACKET.CREATE_GROUP,
    middlewares.validateSchema({ bodySchema: TaxBracketSchema.createTaxGroup }),
    middlewares.auth,
    TaxBracketController.createGroup,
);

router.put(
    ROUTES.CATALOGUE.TAX_BRACKET.EDIT_GROUP,
    middlewares.validateSchema({
        pathParamSchema: CommonSchema.resourcePathParam,
        bodySchema: TaxBracketSchema.editTaxGroup,
    }),
    middlewares.auth,
    TaxBracketController.editGroup,
);

router.delete(
    ROUTES.CATALOGUE.TAX_BRACKET.DELETE_GROUP,
    middlewares.validateSchema({
        pathParamSchema: CommonSchema.resourcePathParam,
    }),
    middlewares.auth,
    TaxBracketController.deleteGroup,
);

// tax bracket
router.get(
    ROUTES.CATALOGUE.TAX_BRACKET.SEARCH_BRACKET,
    middlewares.validateSchema({
        queryParamSchema: CommonSchema.resourceQueryParam,
    }),
    middlewares.auth,
    TaxBracketController.searchBracket,
);

router.get(
    ROUTES.CATALOGUE.TAX_BRACKET.GET_ALL_BRACKET,
    middlewares.auth,
    TaxBracketController.getAllBracket,
);

router.get(
    ROUTES.CATALOGUE.TAX_BRACKET.GET_BRACKET,
    middlewares.validateSchema({
        pathParamSchema: CommonSchema.resourcePathParam,
    }),
    middlewares.auth,
    TaxBracketController.getBracket,
);

router.post(
    ROUTES.CATALOGUE.TAX_BRACKET.CREATE_BRACKET,
    middlewares.validateSchema({ bodySchema: TaxBracketSchema.createTaxBracket }),
    middlewares.auth,
    TaxBracketController.createBracket,
);

router.put(
    ROUTES.CATALOGUE.TAX_BRACKET.EDIT_BRACKET,
    middlewares.validateSchema({
        pathParamSchema: CommonSchema.resourcePathParam,
        bodySchema: TaxBracketSchema.editTaxBracket,
    }),
    middlewares.auth,
    TaxBracketController.editBracket,
);

router.delete(
    ROUTES.CATALOGUE.TAX_BRACKET.DELETE_BRACKET,
    middlewares.validateSchema({
        pathParamSchema: CommonSchema.resourcePathParam,
    }),
    middlewares.auth,
    TaxBracketController.deleteBracket,
);

export default router;
