import {
    ERROR_CODE,
    ICommonResourcePathParam,
    ICreateTaxBracketResponse,
    ICreateTaxGroupResponse,
    IEditTaxBracketRequest,
    IEditTaxBracketResponse,
    IEditTaxGroupRequest,
    IGetAllTaxBracketResponse,
    IGetAllTaxGroupResponse,
    IGetTaxBracketResponse,
    IGetTaxGroupResponse,
    STATUS_CODE,
} from '@sellerspot/universal-types';
import { RequestHandler } from 'express';
import { TaxBracketService, TaxGroupService } from 'services/TaxSettingService';

export class TaxBracketController {
    static getAllTaxBracket: RequestHandler = async (__, res, _) => {
        const taxBrackets = await TaxBracketService.getAllTaxBrackets();
        res.status(STATUS_CODE.OK).send(<IGetAllTaxBracketResponse>{
            status: true,
            data: taxBrackets,
        });
    };

    static getTaxBracket: RequestHandler = async (req, res, _) => {
        const params = (req.params as unknown) as ICommonResourcePathParam;
        const taxBracket = await TaxBracketService.getTaxBracket(params.id);
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

    static createTaxBracket: RequestHandler = async (req, res, _) => {
        const newTaxBracket = req.body;
        const taxBracket = await TaxBracketService.createTaxBracket(newTaxBracket);
        res.status(STATUS_CODE.CREATED).send(<ICreateTaxBracketResponse>{
            status: true,
            data: taxBracket,
        });
    };

    static editTaxBracket: RequestHandler = async (req, res, _) => {
        const newTaxBracket: IEditTaxBracketRequest = req.body;
        const params = (req.params as unknown) as ICommonResourcePathParam;
        const updatedTaxBracket = await TaxBracketService.editTaxBracket(newTaxBracket, params.id);
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

    static deleteTaxBracket: RequestHandler = async (req, res, _) => {
        const params = (req.params as unknown) as ICommonResourcePathParam;
        await TaxBracketService.deleteTaxBracket(params.id);
        res.sendStatus(STATUS_CODE.NO_CONTENT);
    };
}

export class TaxGroupController {
    static getAllTaxGroup: RequestHandler = async (__, res, _) => {
        const taxGroups = await TaxGroupService.getAllTaxGroups();
        res.status(STATUS_CODE.OK).send(<IGetAllTaxGroupResponse>{
            status: true,
            data: taxGroups,
        });
    };

    static getTaxGroup: RequestHandler = async (req, res, _) => {
        const params = (req.params as unknown) as ICommonResourcePathParam;
        const taxGroup = await TaxGroupService.getTaxGroup(params.id);
        if (!taxGroup) {
            return res.status(STATUS_CODE.NOT_FOUND).send(<IGetTaxBracketResponse>{
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

    static createTaxGroup: RequestHandler = async (req, res, _) => {
        const newTaxBracket = req.body;
        const createdTaxgroup = await TaxGroupService.createTaxGroup(newTaxBracket);
        res.status(STATUS_CODE.CREATED).send(<ICreateTaxBracketResponse>{
            status: true,
            data: createdTaxgroup,
        });
    };

    static editTaxGroup: RequestHandler = async (req, res, _) => {
        const newTaxGroup: IEditTaxGroupRequest = req.body;
        const params = (req.params as unknown) as ICommonResourcePathParam;
        const updatedTaxBracket = await TaxGroupService.editTaxGroup(newTaxGroup, params.id);
        if (!updatedTaxBracket) {
            return res.status(STATUS_CODE.NOT_FOUND).send(<IEditTaxBracketResponse>{
                status: false,
                error: {
                    code: ERROR_CODE.NOT_FOUND,
                },
            });
        }
        res.status(STATUS_CODE.OK).send(<IEditTaxBracketResponse>{
            status: true,
            data: updatedTaxBracket,
        });
    };

    static deleteTaxGroup: RequestHandler = async (req, res, _) => {
        const params = (req.params as unknown) as ICommonResourcePathParam;
        await TaxGroupService.deleteTaxGroup(params.id);
        res.sendStatus(STATUS_CODE.NO_CONTENT);
    };
}
