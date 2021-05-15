import { RequestHandler } from 'express';
import {
    ICreateCategoryRequest,
    ICreateCategoryResponse,
    IListCategory,
    IListCategoryResponse,
    IGetCategoryResponse,
    IEditCategoryPositionResponse,
    IEditCategorySiblingOrderResponse,
    IEditCategoryResponse,
    STATUS_CODE,
} from '@sellerspot/universal-types';
import { CategoryService } from 'services/service';

export const createCategory: RequestHandler = async (req, res) => {
    const { title, parentId } = <ICreateCategoryRequest>req.body;
    const { title: createdTitle, id, parent } = await CategoryService.create({ title, parentId });

    const response: ICreateCategoryResponse = {
        status: true,
        data: {
            id,
            title: createdTitle,
            parentId: <string>parent,
        },
    };
    res.status(STATUS_CODE.CREATED).json(response);
};

export const getCategory: RequestHandler = async (req, res) => {
    const category: IListCategory = await CategoryService.show(req.params.id);
    res.status(STATUS_CODE.OK).json(<IGetCategoryResponse>{ status: true, data: category });
};

export const getAllCategories: RequestHandler = async (_, res) => {
    const allCategories: IListCategory[] = await CategoryService.list();
    res.status(STATUS_CODE.OK).json(<IListCategoryResponse>{ status: true, data: allCategories });
};

export const editCategoryPosition: RequestHandler = async (req, res) => {
    const category: IListCategory = await CategoryService.position(req.params.id, req.body);
    res.status(STATUS_CODE.OK).json(<IEditCategoryPositionResponse>{
        status: true,
        data: category,
    });
};

export const editCategorySiblingOrder: RequestHandler = async (req, res) => {
    const category: IListCategory = await CategoryService.siblingorder(req.params.id, req.body);
    res.status(STATUS_CODE.OK).json(<IEditCategorySiblingOrderResponse>{
        status: true,
        data: category,
    });
};

export const editCategory: RequestHandler = async (req, res) => {
    const category: IListCategory = await CategoryService.edit(req.params.id, req.body);
    res.status(STATUS_CODE.OK).json(<IEditCategoryResponse>{
        status: true,
        data: category,
    });
};

export const deleteCategory: RequestHandler = async (req, res) => {
    await CategoryService.delete(req.params.id);
    res.status(STATUS_CODE.NO_CONTENT).send();
};
