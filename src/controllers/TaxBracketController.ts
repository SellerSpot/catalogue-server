import { RequestHandler } from 'express';
import { TaxBracketService } from 'services/TaxBracketService';
import {
    ITaxBracketResponse,
    ITaxGroupResponse,
    IGetAllTaxBracketResponse,
} from '@sellerspot/universal-types';

export class TaxBracketController {
    static createTaxBracket: RequestHandler = async (req, res, _) => {
        const newTaxBracket = req.body;
        const taxBracket = await TaxBracketService.createBracket(newTaxBracket);
        res.json(<ITaxBracketResponse>{ status: true, data: taxBracket });
    };
    static createTaxGroup: RequestHandler = async (req, res, _) => {
        const newTaxGroup = req.body;
        const taxGroup = await TaxBracketService.createGroup(newTaxGroup);
        res.json(<ITaxGroupResponse>{ status: true, data: taxGroup });
    };
    static getAllTaxBracket: RequestHandler = async (__, res, _) => {
        const taxBrackets = await TaxBracketService.list();
        res.json(<IGetAllTaxBracketResponse>{ status: true, data: taxBrackets });
    };
}
