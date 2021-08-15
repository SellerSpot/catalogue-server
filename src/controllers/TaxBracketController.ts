import {
    ERROR_CODE,
    ICommonResourcePathParam,
    ICreateTaxBracketResponse,
    ICreateTaxGroupResponse,
    IEditTaxBracketRequest,
    IEditTaxBracketResponse,
    IEditTaxGroupRequest,
    IEditTaxGroupResponse,
    IGetAllTaxBracketResponse,
    IGetAllTaxGroupResponse,
    IGetTaxBracketResponse,
    IGetTaxGroupResponse,
    ISearchResourceQueryParam,
    ISearchTaxBracketResponse,
    ISearchTaxGroupResponse,
    STATUS_CODE,
} from '@sellerspot/universal-types';
import { RequestHandler } from 'express';
import { TaxBracketService } from 'services/TaxSettingService';

export class TaxBracketController {
    static getAllBracketsAndGroups: RequestHandler = async (__, res, _) => {
        const taxBrackets = await TaxBracketService.getAllBracketsAndGroups();
        res.status(STATUS_CODE.OK).send(<IGetAllTaxBracketResponse>{
            status: true,
            data: taxBrackets,
        });
    };

    static searchAllBracketAndGroup: RequestHandler = async (req, res, _) => {
        const params = (req.query as unknown) as ISearchResourceQueryParam;
        const matchedTaxBrackets = await TaxBracketService.searchAllBracketAndGroup(params.query);
        res.status(STATUS_CODE.OK).send(<ISearchTaxBracketResponse>{
            status: true,
            data: matchedTaxBrackets,
        });
    };

    static getAllBracket: RequestHandler = async (__, res, _) => {
        const taxBrackets = await TaxBracketService.getOnlyBrackets();
        res.status(STATUS_CODE.OK).send(<IGetAllTaxBracketResponse>{
            status: true,
            data: taxBrackets,
        });
    };

    static getBracket: RequestHandler = async (req, res, _) => {
        const params = (req.params as unknown) as ICommonResourcePathParam;
        const taxBracket = await TaxBracketService.getBracket(params.id);
        if (!taxBracket) {
            return res.status(STATUS_CODE.NOT_FOUND).send(<IGetTaxBracketResponse>{
                status: false,
                error: {
                    code: ERROR_CODE.NOT_FOUND,
                },
            });
        }
        res.status(STATUS_CODE.OK).send(<IGetTaxBracketResponse>{
            status: true,
            data: taxBracket,
        });
    };

    static createBracket: RequestHandler = async (req, res, _) => {
        const newTaxBracket = req.body;
        const taxBracket = await TaxBracketService.createBracket(newTaxBracket);
        res.status(STATUS_CODE.CREATED).send(<ICreateTaxBracketResponse>{
            status: true,
            data: taxBracket,
        });
    };

    static searchBracket: RequestHandler = async (req, res, _) => {
        const params = (req.query as unknown) as ISearchResourceQueryParam;
        const matchedTaxBrackets = await TaxBracketService.searchBracket(params.query);
        res.status(STATUS_CODE.OK).send(<ISearchTaxBracketResponse>{
            status: true,
            data: matchedTaxBrackets,
        });
    };

    static editBracket: RequestHandler = async (req, res, _) => {
        const newTaxBracket: IEditTaxBracketRequest = req.body;
        const params = (req.params as unknown) as ICommonResourcePathParam;
        const updatedTaxBracket = await TaxBracketService.editBracket(newTaxBracket, params.id);
        if (!updatedTaxBracket) {
            return res.status(STATUS_CODE.NOT_FOUND).send(<IEditTaxBracketResponse>{
                status: false,
                error: {
                    code: ERROR_CODE.NOT_FOUND,
                    message: 'Tax Bracket not found',
                },
            });
        }
        res.status(STATUS_CODE.OK).send(<IEditTaxBracketResponse>{
            status: true,
            data: updatedTaxBracket,
        });
    };

    static deleteBracket: RequestHandler = async (req, res, _) => {
        const params = (req.params as unknown) as ICommonResourcePathParam;
        await TaxBracketService.deleteBracket(params.id);
        res.sendStatus(STATUS_CODE.NO_CONTENT);
    };

    static getAllGroup: RequestHandler = async (__, res, _) => {
        const taxGroups = await TaxBracketService.getOnlyGroups();
        res.status(STATUS_CODE.OK).send(<IGetAllTaxGroupResponse>{
            status: true,
            data: taxGroups,
        });
    };

    static getGroup: RequestHandler = async (req, res, _) => {
        const params = (req.params as unknown) as ICommonResourcePathParam;
        const taxGroup = await TaxBracketService.getGroup(params.id);
        if (!taxGroup) {
            return res.status(STATUS_CODE.NOT_FOUND).send(<IGetTaxGroupResponse>{
                status: false,
                error: {
                    code: ERROR_CODE.NOT_FOUND,
                    message: 'Tax Group not found',
                },
            });
        }
        res.status(STATUS_CODE.OK).send(<IGetTaxGroupResponse>{
            status: true,
            data: taxGroup,
        });
    };

    static createGroup: RequestHandler = async (req, res, _) => {
        const newTaxGroup = req.body;
        const createdTaxgroup = await TaxBracketService.createGroup(newTaxGroup);
        res.status(STATUS_CODE.CREATED).send(<ICreateTaxGroupResponse>{
            status: true,
            data: createdTaxgroup,
        });
    };

    static searchGroup: RequestHandler = async (req, res, _) => {
        const params = (req.query as unknown) as ISearchResourceQueryParam;
        const matchedTaxGroups = await TaxBracketService.searchGroup(params.query);
        res.status(STATUS_CODE.OK).send(<ISearchTaxGroupResponse>{
            status: true,
            data: matchedTaxGroups,
        });
    };

    static editGroup: RequestHandler = async (req, res, _) => {
        const newTaxGroup: IEditTaxGroupRequest = req.body;
        const params = (req.params as unknown) as ICommonResourcePathParam;
        const updatedTaxGroup = await TaxBracketService.editGroup(newTaxGroup, params.id);
        if (!updatedTaxGroup) {
            return res.status(STATUS_CODE.NOT_FOUND).send(<IEditTaxGroupResponse>{
                status: false,
                error: {
                    code: ERROR_CODE.NOT_FOUND,
                },
            });
        }
        res.status(STATUS_CODE.OK).send(<IEditTaxGroupResponse>{
            status: true,
            data: updatedTaxGroup,
        });
    };

    static deleteGroup: RequestHandler = async (req, res, _) => {
        const params = (req.params as unknown) as ICommonResourcePathParam;
        await TaxBracketService.deleteGroup(params.id);
        res.sendStatus(STATUS_CODE.NO_CONTENT);
    };
}
