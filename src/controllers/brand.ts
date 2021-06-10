import { RequestHandler } from 'express';
import { BrandService } from 'services/Brand';
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

export const createBrand: RequestHandler = async (req, res) => {
    const newBrand: IBrandData = await BrandService.create(<ICreateBrandRequest>req.body);
    res.status(STATUS_CODE.CREATED).json(<ICreateBrandResponse>{
        status: true,
        data: newBrand,
    });
};

export const getBrand: RequestHandler = async (req, res) => {
    const brand: IBrandData = await BrandService.show(req.params.id);
    if (!brand) {
        return res.status(STATUS_CODE.NOT_FOUND).json(<IGetBrandResponse>{
            status: false,
            error: {
                code: ERROR_CODE.NOT_FOUND,
            },
        });
    }
    res.status(STATUS_CODE.OK).json(<IGetBrandResponse>{
        status: true,
        data: brand,
    });
};

export const getAllBrand: RequestHandler = async (req, res) => {
    const brandList: IBrandData[] = await BrandService.list();
    res.status(STATUS_CODE.OK).json(<IGetAllBrandResponse>{
        status: true,
        data: brandList,
    });
};

export const editBrand: RequestHandler = async (req, res) => {
    const editedBrand: IBrandData = await BrandService.edit(
        req.params.id,
        <IEditBrandRequest>req.body,
    );
    if (!editedBrand) {
        return res.status(STATUS_CODE.NOT_FOUND).json(<IEditBrandResponse>{
            status: false,
            error: {
                code: ERROR_CODE.NOT_FOUND,
            },
        });
    }
    res.status(STATUS_CODE.OK).json(<IEditBrandResponse>{
        status: true,
        data: editedBrand,
    });
};

export const deleteBrand: RequestHandler = async (req, res) => {
    await BrandService.delete(req.params.id);
    res.status(STATUS_CODE.NO_CONTENT).send();
};
