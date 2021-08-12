import { RequestHandler } from 'express';
import {
    IOutletData,
    STATUS_CODE,
    IGetAllOutletResponse,
    ICreateOutletResponse,
    ICreateOutletRequest,
    ICommonResourcePathParam,
    IGetOutletResponse,
    ERROR_CODE,
    ISearchResourceQueryParam,
    ISearchOutletResponse,
    IEditOutletRequest,
    IEditOutletResponse,
} from '@sellerspot/universal-types';
import OutletService from '../services/OutletService';

export default class OutletController {
    static getAllOutlet: RequestHandler = async (req, res) => {
        const allOutlets: IOutletData[] = await OutletService.getAllOutlet();
        res.status(STATUS_CODE.OK).send(<IGetAllOutletResponse>{
            status: true,
            data: allOutlets,
        });
    };

    static createOutlet: RequestHandler = async (req, res) => {
        const newOutlet: IOutletData = await OutletService.createOutlet(
            <ICreateOutletRequest>req.body,
        );
        res.status(STATUS_CODE.CREATED).send(<ICreateOutletResponse>{
            status: true,
            data: newOutlet,
        });
    };

    static getOutlet: RequestHandler = async (req, res) => {
        const params = (req.params as unknown) as ICommonResourcePathParam;
        const outlet: IOutletData = await OutletService.getOutlet(params.id);
        if (!outlet) {
            return res.status(STATUS_CODE.NOT_FOUND).send(<IGetOutletResponse>{
                status: false,
                error: {
                    code: ERROR_CODE.NOT_FOUND,
                },
            });
        }
        res.status(STATUS_CODE.OK).send(<IGetOutletResponse>{
            status: true,
            data: outlet,
        });
    };

    static searchOutlet: RequestHandler = async (req, res) => {
        const params = (req.query as unknown) as ISearchResourceQueryParam;
        const matchedOutlets: IOutletData[] = await OutletService.searchOutlet(params.query);
        res.status(STATUS_CODE.OK).send(<ISearchOutletResponse>{
            status: true,
            data: matchedOutlets,
        });
    };

    static editOutlet: RequestHandler = async (req, res) => {
        const editedOutlet: IOutletData = await OutletService.editOutlet(
            req.params.id,
            <IEditOutletRequest>req.body,
        );
        if (!editedOutlet) {
            return res.status(STATUS_CODE.NOT_FOUND).send(<IEditOutletResponse>{
                status: false,
                error: {
                    code: ERROR_CODE.NOT_FOUND,
                },
            });
        }
        res.status(STATUS_CODE.OK).send(<IEditOutletResponse>{
            status: true,
            data: editedOutlet,
        });
    };

    static deleteOutlet: RequestHandler = async (req, res) => {
        await OutletService.deleteOutlet(req.params.id);
        res.status(STATUS_CODE.NO_CONTENT).send();
    };
}
