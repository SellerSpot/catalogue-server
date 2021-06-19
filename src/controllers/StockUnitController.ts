import { RequestHandler } from 'express';
import {
    IEditStockUnitRequest,
    IBrandData,
    STATUS_CODE,
    ERROR_CODE,
    IEditStockUnitResponse,
    IGetAllStockUnitResponse,
    IGetStockUnitResponse,
    ICreateStockUnitRequest,
    ICreateStockUnitResponse,
} from '@sellerspot/universal-types';
import { StockUnitService } from 'services/services';

export class StockUnitController {
    static createStockUnit: RequestHandler = async (req, res) => {
        const newBrand: IBrandData = await StockUnitService.create(
            <ICreateStockUnitRequest>req.body,
        );
        res.status(STATUS_CODE.CREATED).send(<ICreateStockUnitResponse>{
            status: true,
            data: newBrand,
        });
    };

    static getStockUnit: RequestHandler = async (req, res) => {
        const brand: IBrandData = await StockUnitService.show(req.params.id);
        if (!brand) {
            return res.status(STATUS_CODE.NOT_FOUND).send(<IGetStockUnitResponse>{
                status: false,
                error: {
                    code: ERROR_CODE.NOT_FOUND,
                },
            });
        }
        res.status(STATUS_CODE.OK).send(<IGetStockUnitResponse>{
            status: true,
            data: brand,
        });
    };

    static getAllStockUnit: RequestHandler = async (_, res) => {
        const stockUnitList: IBrandData[] = await StockUnitService.list();
        res.status(STATUS_CODE.OK).send(<IGetAllStockUnitResponse>{
            status: true,
            data: stockUnitList,
        });
    };

    static editStockUnit: RequestHandler = async (req, res) => {
        const editedStockUnit: IBrandData = await StockUnitService.edit(
            req.params.id,
            <IEditStockUnitRequest>req.body,
        );
        if (!editedStockUnit) {
            return res.status(STATUS_CODE.NOT_FOUND).send(<IEditStockUnitResponse>{
                status: false,
                error: {
                    code: ERROR_CODE.NOT_FOUND,
                },
            });
        }
        res.status(STATUS_CODE.OK).send(<IEditStockUnitResponse>{
            status: true,
            data: editedStockUnit,
        });
    };

    static deleteStockUnit: RequestHandler = async (req, res) => {
        await StockUnitService.delete(req.params.id);
        res.sendStatus(STATUS_CODE.NO_CONTENT);
    };
}
