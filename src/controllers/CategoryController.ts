import { RequestHandler } from 'express';
import {
    ICreateCategoryRequest,
    ICreateCategoryResponse,
    ICategoryData,
    IGetAllCategoryResponse,
    IGetCategoryResponse,
    IEditCategoryPositionResponse,
    IEditCategoryChildrenOrderResponse,
    IEditCategoryResponse,
    STATUS_CODE,
    IEditCategoryChildrenOrderRequest,
    ICommonResourcePathParam,
    IEditCategoryRequest,
} from '@sellerspot/universal-types';
import { CategoryService } from 'services/services';
import { IEditChildrenOrderPathParam } from '../../.yalc/@sellerspot/universal-types/dist/catalogue/category/routes';

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
        const params = (req.params as unknown) as ICommonResourcePathParam;
        const category: ICategoryData = await CategoryService.getCategory(params.id);
        res.status(STATUS_CODE.OK).json(<IGetCategoryResponse>{ status: true, data: category });
    };

    static getAllCategories: RequestHandler = async (_, res) => {
        const allCategories: ICategoryData[] = await CategoryService.getAllCategory();
        console.log(allCategories);

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

    static editCategoryChildrenOrder: RequestHandler = async (req, res) => {
        const params = (req.params as unknown) as IEditChildrenOrderPathParam;
        const body: IEditCategoryChildrenOrderRequest = req.body;
        const category: ICategoryData = await CategoryService.editCategoryChildrenOrder(
            params.parentId,
            body,
        );
        res.status(STATUS_CODE.OK).json(<IEditCategoryChildrenOrderResponse>{
            status: true,
            data: category,
        });
    };

    static editCategory: RequestHandler = async (req, res) => {
        const params = (req.params as unknown) as ICommonResourcePathParam;
        const body: IEditCategoryRequest = req.body;
        const category: ICategoryData = await CategoryService.editCategoryContent(params.id, body);
        res.status(STATUS_CODE.OK).json(<IEditCategoryResponse>{
            status: true,
            data: category,
        });
    };

    static deleteCategory: RequestHandler = async (req, res) => {
        const params = (req.params as unknown) as ICommonResourcePathParam;
        await CategoryService.deleteCategory(params.id);
        res.status(STATUS_CODE.NO_CONTENT).send();
    };
}
