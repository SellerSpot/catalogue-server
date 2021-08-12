import { tenantDbServices, tenantDbModels } from '@sellerspot/database-models';
import {
    ICreateCategoryRequest,
    ICategoryData,
    IEditCategoryPositionRequest,
    IEditCategoryChildrenOrderRequest,
    IEditCategoryRequest,
} from '@sellerspot/universal-types';
import { isEmpty } from 'lodash';
import { Types } from 'mongoose';

type ICategoryDoc = tenantDbModels.catalogueModels.ICategoryDoc;

export class CategoryService {
    static async getAllCategory(): Promise<ICategoryData[]> {
        const { CategoryDbService } = tenantDbServices.catalogue;
        const allCategory: ICategoryDoc[] = await CategoryDbService.getAllCategory();
        const categoryList: ICategoryData[] = [];
        if (!isEmpty(allCategory)) {
            const categoryIdVsCategory: Record<string, ICategoryDoc> = {};
            allCategory.forEach((currCategory) => {
                const currentId = currCategory.id;
                categoryIdVsCategory[currentId] = currCategory;
            });
            //root is always added to start of array
            const rootCategory = allCategory[0];

            if (!isEmpty(rootCategory.children)) {
                for (const currCategory of rootCategory.children) {
                    const topCategoryId = (<Types.ObjectId>currCategory).toHexString();
                    const topCategoryData = CategoryService.buildCategoryRecursively(
                        topCategoryId,
                        categoryIdVsCategory,
                    );
                    if (!isEmpty(topCategoryData)) {
                        categoryList.push(topCategoryData);
                    }
                }
            }
        }
        return categoryList;
    }

    static async getCategory(categoryId: string): Promise<ICategoryData> {
        const { CategoryDbService } = tenantDbServices.catalogue;
        const { id, title, parent, children } = await CategoryDbService.getCategoryById(categoryId);
        const childrenData = (<ICategoryData[]>children).map((child) => ({
            id: child.id,
            title: child.title,
            parent: child.parentId,
        }));
        const categoryRes: ICategoryData = {
            id,
            title,
            parentId: (<Types.ObjectId>parent).toHexString(),
            children: childrenData,
        };
        return categoryRes;
    }

    static async createCategory(newCategory: ICreateCategoryRequest): Promise<ICategoryData> {
        const { CategoryDbService } = tenantDbServices.catalogue;
        const category = await CategoryDbService.createCategory(newCategory);
        const { id, parent, title } = category;
        const parentStr = (<Types.ObjectId>parent)?.toHexString();
        const categoryRes: ICategoryData = {
            id,
            title,
            parentId: parentStr,
        };
        return categoryRes;
    }

    static async editCategoryPosition(
        categoryId: string,
        pos: IEditCategoryPositionRequest,
    ): Promise<ICategoryData> {
        const { CategoryDbService } = tenantDbServices.catalogue;
        const { id, title, parent } = await CategoryDbService.editCategoryPosition(categoryId, pos);
        const categoryRes: ICategoryData = {
            id,
            title,
            parentId: (<Types.ObjectId>parent).toHexString(),
        };
        return categoryRes;
    }

    static async editCategoryContent(
        categoryId: string,
        categoryMeta: IEditCategoryRequest,
    ): Promise<ICategoryData> {
        const { CategoryDbService } = tenantDbServices.catalogue;
        const { id, title, children } = await CategoryDbService.editCategoryContent(
            categoryId,
            categoryMeta,
        );
        const childrenData = (<ICategoryDoc[]>children).map((child) => {
            return { id: <string>child.id, title: child.title };
        });
        return { id, title, children: childrenData };
    }

    static async editCategoryChildrenOrder(
        categoryId: string,
        siblingArr: IEditCategoryChildrenOrderRequest,
    ): Promise<ICategoryData> {
        const { CategoryDbService } = tenantDbServices.catalogue;
        const { id, title, children } = await CategoryDbService.editCategoryChildrenOrder(
            categoryId,
            siblingArr,
        );
        const childrenData = (<ICategoryDoc[]>children).map((child) => {
            return { id: <string>child.id, title: child.title };
        });
        return { id, title, children: childrenData };
    }

    static async deleteCategory(categoryId: string): Promise<void> {
        const { CategoryDbService } = tenantDbServices.catalogue;
        await CategoryDbService.deleteCategory(categoryId);
    }

    private static buildCategoryRecursively(
        categoryId: string,
        categoryIdVsCategory: Record<string, ICategoryDoc>,
    ): ICategoryData {
        const categoryData = <ICategoryData>{};

        const currCategory = categoryIdVsCategory[categoryId];

        if (!isEmpty(currCategory)) {
            const { id, title, children } = currCategory;
            categoryData.id = id;
            categoryData.title = title;
            const childCategoryList: ICategoryData[] = [];
            if (children.length || children.length !== 0) {
                for (const child of children) {
                    const childId = (<Types.ObjectId>child).toHexString();
                    const childData = CategoryService.buildCategoryRecursively(
                        childId,
                        categoryIdVsCategory,
                    );
                    if (!isEmpty(childData)) {
                        childCategoryList.push(childData);
                    }
                }
            }

            if (!isEmpty(childCategoryList)) {
                categoryData.children = childCategoryList;
            }
        }
        return categoryData;
    }
}
