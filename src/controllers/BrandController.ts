import { RequestHandler } from 'express';
import {
    ICreateBrandRequest,
    ICreateBrandResponse,
    IGetAllBrandResponse,
    IEditBrandRequest,
    IEditBrandResponse,
    IGetBrandResponse,
    IBrandData,
    STATUS_CODE,
    ERROR_CODE,
} from '@sellerspot/universal-types';
import { BrandService } from 'services/services';

export default class BrandController {
    static createBrand: RequestHandler = async (req, res) => {
        const newBrand: IBrandData = await BrandService.create(<ICreateBrandRequest>req.body);
        res.status(STATUS_CODE.CREATED).send(<ICreateBrandResponse>{
            status: true,
            data: newBrand,
        });
    };

    static getBrand: RequestHandler = async (req, res) => {
        const brand: IBrandData = await BrandService.show(req.params.id);
        if (!brand) {
            return res.status(STATUS_CODE.NOT_FOUND).send(<IGetBrandResponse>{
                status: false,
                error: {
                    code: ERROR_CODE.NOT_FOUND,
                },
            });
        }
        res.status(STATUS_CODE.OK).send(<IGetBrandResponse>{
            status: true,
            data: brand,
        });
    };

    static getAllBrand: RequestHandler = async (req, res) => {
        const brandList: IBrandData[] = await BrandService.list();
        res.status(STATUS_CODE.OK).send(<IGetAllBrandResponse>{
            status: true,
            data: brandList,
        });
    };

    static editBrand: RequestHandler = async (req, res) => {
        const editedBrand: IBrandData = await BrandService.edit(
            req.params.id,
            <IEditBrandRequest>req.body,
        );
        if (!editedBrand) {
            return res.status(STATUS_CODE.NOT_FOUND).send(<IEditBrandResponse>{
                status: false,
                error: {
                    code: ERROR_CODE.NOT_FOUND,
                },
            });
        }
        res.status(STATUS_CODE.OK).send(<IEditBrandResponse>{
            status: true,
            data: editedBrand,
        });
    };

    static deleteBrand: RequestHandler = async (req, res) => {
        await BrandService.delete(req.params.id);
        res.status(STATUS_CODE.NO_CONTENT).send();
    };
}
