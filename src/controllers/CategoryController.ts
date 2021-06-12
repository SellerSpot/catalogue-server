import { RequestHandler } from 'express';
import {
    ICreateCategoryRequest,
    ICreateCategoryResponse,
    ICategoryData,
    IGetAllCategoryResponse,
    IGetCategoryResponse,
    IEditCategoryPositionResponse,
    IEditCategorySiblingOrderResponse,
    IEditCategoryResponse,
    STATUS_CODE,
} from '@sellerspot/universal-types';
import { CategoryService } from 'services/services';

export default class CategoryController {
    static createCategory: RequestHandler = async (req, res) => {
        const { title, parentId } = <ICreateCategoryRequest>req.body;
        const { title: createdTitle, id, parent } = await CategoryService.create({
            title,
            parentId,
        });

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

    static getCategory: RequestHandler = async (req, res) => {
        const category: ICategoryData = await CategoryService.show(req.params.id);
        res.status(STATUS_CODE.OK).json(<IGetCategoryResponse>{ status: true, data: category });
    };

    static getAllCategories: RequestHandler = async (_, res) => {
        const allCategories: ICategoryData[] = await CategoryService.list();
        res.status(STATUS_CODE.OK).json(<IGetAllCategoryResponse>{
            status: true,
            data: allCategories,
        });
    };

    static editCategoryPosition: RequestHandler = async (req, res) => {
        const category: ICategoryData = await CategoryService.position(req.params.id, req.body);
        res.status(STATUS_CODE.OK).json(<IEditCategoryPositionResponse>{
            status: true,
            data: category,
        });
    };

    static editCategorySiblingOrder: RequestHandler = async (req, res) => {
        const category: ICategoryData = await CategoryService.siblingorder(req.params.id, req.body);
        res.status(STATUS_CODE.OK).json(<IEditCategorySiblingOrderResponse>{
            status: true,
            data: category,
        });
    };

    static editCategory: RequestHandler = async (req, res) => {
        const category: ICategoryData = await CategoryService.edit(req.params.id, req.body);
        res.status(STATUS_CODE.OK).json(<IEditCategoryResponse>{
            status: true,
            data: category,
        });
    };

    static deleteCategory: RequestHandler = async (req, res) => {
        await CategoryService.delete(req.params.id);
        res.status(STATUS_CODE.NO_CONTENT).send();
    };
}
