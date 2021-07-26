import {
    ERROR_CODE,
    IBrandData,
    ICommonResourcePathParam,
    ICreateBrandRequest,
    ICreateBrandResponse,
    IEditBrandRequest,
    IEditBrandResponse,
    IGetAllBrandResponse,
    IGetBrandResponse,
    ISearchBrandResponse,
    ISearchResourceQueryParam,
    STATUS_CODE,
} from '@sellerspot/universal-types';
import { RequestHandler } from 'express';
import { BrandService } from 'services/services';

export class BrandController {
    static createBrand: RequestHandler = async (req, res) => {
        const newBrand: IBrandData = await BrandService.createBrand(<ICreateBrandRequest>req.body);
        res.status(STATUS_CODE.CREATED).send(<ICreateBrandResponse>{
            status: true,
            data: newBrand,
        });
    };

    static getBrand: RequestHandler = async (req, res) => {
        const params = (req.params as unknown) as ICommonResourcePathParam;
        const brand: IBrandData = await BrandService.getBrand(params.id);
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

    static searchBrand: RequestHandler = async (req, res) => {
        const params = (req.query as unknown) as ISearchResourceQueryParam;
        const matchedBrands: IBrandData[] = await BrandService.searchBrand(params.query);
        res.status(STATUS_CODE.OK).send(<ISearchBrandResponse>{
            status: true,
            data: matchedBrands,
        });
    };

    static getAllBrand: RequestHandler = async (req, res) => {
        const allbrands: IBrandData[] = await BrandService.getAllBrand();
        res.status(STATUS_CODE.OK).send(<IGetAllBrandResponse>{
            status: true,
            data: allbrands,
        });
    };

    static editBrand: RequestHandler = async (req, res) => {
        const editedBrand: IBrandData = await BrandService.editBrand(
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
        await BrandService.deleteBrand(req.params.id);
        res.status(STATUS_CODE.NO_CONTENT).send();
    };
}
