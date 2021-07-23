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

export class CategoryController {
    static createCategory: RequestHandler = async (req, res) => {
        const { title, parentId } = <ICreateCategoryRequest>req.body;
        const response: ICategoryData = await CategoryService.createCategory({
            title,
            parentId,
        });
        res.status(STATUS_CODE.CREATED).json(<ICreateCategoryResponse>{
            status: true,
            data: response,
        });
    };

    static getCategory: RequestHandler = async (req, res) => {
        const category: ICategoryData = await CategoryService.getCategory(req.params.id);
        res.status(STATUS_CODE.OK).json(<IGetCategoryResponse>{ status: true, data: category });
    };

    static getAllCategories: RequestHandler = async (_, res) => {
        const allCategories: ICategoryData[] = await CategoryService.getAllCategory();
        res.status(STATUS_CODE.OK).json(<IGetAllCategoryResponse>{
            status: true,
            data: allCategories,
        });
    };

    static editCategoryPosition: RequestHandler = async (req, res) => {
        const category: ICategoryData = await CategoryService.editCategoryPosition(
            req.params.id,
            req.body,
        );
        res.status(STATUS_CODE.OK).json(<IEditCategoryPositionResponse>{
            status: true,
            data: category,
        });
    };

    static editCategorySiblingOrder: RequestHandler = async (req, res) => {
        const category: ICategoryData = await CategoryService.editCategorySiblingOrder(
            req.params.id,
            req.body,
        );
        res.status(STATUS_CODE.OK).json(<IEditCategorySiblingOrderResponse>{
            status: true,
            data: category,
        });
    };

    static editCategory: RequestHandler = async (req, res) => {
        const category: ICategoryData = await CategoryService.editCategoryContent(
            req.params.id,
            req.body,
        );
        res.status(STATUS_CODE.OK).json(<IEditCategoryResponse>{
            status: true,
            data: category,
        });
    };

    static deleteCategory: RequestHandler = async (req, res) => {
        await CategoryService.deleteCategory(req.params.id);
        res.status(STATUS_CODE.NO_CONTENT).send();
    };
}
