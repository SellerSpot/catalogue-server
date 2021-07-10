import { tenantDbServices, tenantDbModels } from '@sellerspot/database-models';
import {
    ICreateCategoryRequest,
    ICategoryData,
    IEditCategoryPositionRequest,
    IEditCategorySiblingOrderRequest,
    IEditCategoryRequest,
} from '@sellerspot/universal-types';
import { isEmpty } from 'lodash';
import { Types } from 'mongoose';

type ICategoryDoc = tenantDbModels.catalogueModels.ICategoryDoc;

export class CategoryService {
    static async create(newCategory: ICreateCategoryRequest): Promise<ICategoryData> {
        const { createCategory } = tenantDbServices.catalogue;
        const category = await createCategory(newCategory);
        const { id, parent, title } = category;
        const parentStr = (<Types.ObjectId>parent)?.toHexString();
        const categoryRes: ICategoryData = {
            id,
            title,
            parentId: parentStr,
        };
        return categoryRes;
    }

    static async show(categoryId: string): Promise<ICategoryData> {
        const { getCategoryById } = tenantDbServices.catalogue;
        const { id, title, parent, children } = await getCategoryById(categoryId);
        const childrenHash = (<ICategoryData[]>children).map((child) => ({
            id: child.id,
            title: child.title,
            parent: child.parentId,
        }));
        const categoryRes: ICategoryData = {
            id,
            title,
            parentId: (<Types.ObjectId>parent).toHexString(),
            children: childrenHash,
        };
        return categoryRes;
    }

    static async position(
        categoryId: string,
        pos: IEditCategoryPositionRequest,
    ): Promise<ICategoryData> {
        const { editCategoryPosition } = tenantDbServices.catalogue;
        const { id, title, parent } = await editCategoryPosition(categoryId, pos);
        const categoryRes: ICategoryData = {
            id,
            title,
            parentId: (<Types.ObjectId>parent).toHexString(),
        };
        return categoryRes;
    }

    static async edit(
        categoryId: string,
        categoryMeta: IEditCategoryRequest,
    ): Promise<ICategoryData> {
        const { editCategoryContent } = tenantDbServices.catalogue;
        const { id, title } = await editCategoryContent(categoryId, categoryMeta);
        return { id, title };
    }

    static async siblingorder(
        categoryId: string,
        siblingArr: IEditCategorySiblingOrderRequest,
    ): Promise<ICategoryData> {
        const { editCategorySiblingOrder } = tenantDbServices.catalogue;
        const { id, title, children } = await editCategorySiblingOrder(categoryId, siblingArr);
        const childrenHash = (<ICategoryDoc[]>children).map((child) => {
            return { id: <string>child.id, title: child.title };
        });
        return { id, title, children: childrenHash };
    }

    static async delete(categoryId: string): Promise<void> {
        const { deleteCategory } = tenantDbServices.catalogue;
        await deleteCategory(categoryId);
    }

    static async list(): Promise<ICategoryData[]> {
        const { getAllCategory } = tenantDbServices.catalogue;
        const allCategory: ICategoryDoc[] = await getAllCategory();
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
                    const topCategoryHash = CategoryService.buildCategoryRecursively(
                        topCategoryId,
                        categoryIdVsCategory,
                    );
                    if (!isEmpty(topCategoryHash)) {
                        categoryList.push(topCategoryHash);
                    }
                }
            }
        }
        return categoryList;
    }

    private static buildCategoryRecursively(
        categoryId: string,
        categoryIdVsCategory: Record<string, ICategoryDoc>,
    ): ICategoryData {
        const categoryHash = <ICategoryData>{};

        const currCategory = categoryIdVsCategory[categoryId];

        if (!isEmpty(currCategory)) {
            const { id, title, children } = currCategory;
            categoryHash.id = id;
            categoryHash.title = title;
            const childCategoryList: ICategoryData[] = [];
            if (children.length || children.length !== 0) {
                for (const child of children) {
                    const childId = (<Types.ObjectId>child).toHexString();
                    const childHash = CategoryService.buildCategoryRecursively(
                        childId,
                        categoryIdVsCategory,
                    );
                    if (!isEmpty(childHash)) {
                        childCategoryList.push(childHash);
                    }
                }
            }

            if (!isEmpty(childCategoryList)) {
                categoryHash.children = childCategoryList;
            }
        }
        return categoryHash;
    }
}
