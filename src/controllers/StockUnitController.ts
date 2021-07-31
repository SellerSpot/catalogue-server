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
    ISearchResourceQueryParam,
    IStockUnitData,
    ISearchStockUnitResponse,
} from '@sellerspot/universal-types';
import { StockUnitService } from 'services/services';

export class StockUnitController {
    static createStockUnit: RequestHandler = async (req, res) => {
        const newBrand: IBrandData = await StockUnitService.createStockUnit(
            <ICreateStockUnitRequest>req.body,
        );
        res.status(STATUS_CODE.CREATED).send(<ICreateStockUnitResponse>{
            status: true,
            data: newBrand,
        });
    };

    static getStockUnit: RequestHandler = async (req, res) => {
        const brand: IBrandData = await StockUnitService.getStockUnit(req.params.id);
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

    static searchStockUnit: RequestHandler = async (req, res) => {
        const params = (req.query as unknown) as ISearchResourceQueryParam;
        const matchedStockUnits: IStockUnitData[] = await StockUnitService.searchStockUnit(
            params.query,
        );
        res.status(STATUS_CODE.OK).send(<ISearchStockUnitResponse>{
            status: true,
            data: matchedStockUnits,
        });
    };

    static getAllStockUnit: RequestHandler = async (_, res) => {
        const stockUnitList: IBrandData[] = await StockUnitService.getAllStockUnit();
        res.status(STATUS_CODE.OK).send(<IGetAllStockUnitResponse>{
            status: true,
            data: stockUnitList,
        });
    };

    static editStockUnit: RequestHandler = async (req, res) => {
        const editedStockUnit: IBrandData = await StockUnitService.editStockUnit(
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
        await StockUnitService.deleteStockUnit(req.params.id);
        res.sendStatus(STATUS_CODE.NO_CONTENT);
    };
}
