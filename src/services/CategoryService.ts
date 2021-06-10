import { tenantDbServices, tenantDbModels } from '@sellerspot/database-models';
import {
    ICreateCategoryRequest,
    ICategory,
    IEditCategoryPositionRequest,
    IEditCategorySiblingOrderRequest,
    IEditCategoryRequest,
} from '@sellerspot/universal-types';
import { isEmpty } from 'lodash';

type TCategory = tenantDbModels.catalogueModels.ICategory;
type TCategoryDoc = tenantDbModels.catalogueModels.ICategoryDoc;

export default class CategoryService {
    static async create(newCategory: ICreateCategoryRequest): Promise<TCategory> {
        const { createCategory } = tenantDbServices.catalogue;
        const { title, parentId } = newCategory;
        const category = await createCategory({ title, parent: parentId });
        return <TCategory>category.toJSON();
    }

    static async show(categoryId: string): Promise<ICategory> {
        const { getCategoryById } = tenantDbServices.catalogue;
        const { id, title, children } = await getCategoryById(categoryId);
        const childrenHash = (<TCategoryDoc[]>children).map((child) => {
            return { id: <string>child.id, title: child.title };
        });
        return { id, title, children: childrenHash };
    }

    static async position(
        categoryId: string,
        pos: IEditCategoryPositionRequest,
    ): Promise<ICategory> {
        const { editCategoryPosition } = tenantDbServices.catalogue;
        const { id, title, parent: parentId } = await editCategoryPosition(categoryId, pos);
        return { id, title, parentId: <string>parentId };
    }

    static async edit(categoryId: string, categoryMeta: IEditCategoryRequest): Promise<ICategory> {
        const { editCategoryContent } = tenantDbServices.catalogue;
        const { id, title } = await editCategoryContent(categoryId, categoryMeta);
        return { id, title };
    }

    static async siblingorder(
        categoryId: string,
        siblingArr: IEditCategorySiblingOrderRequest,
    ): Promise<ICategory> {
        const { editCategorySiblingOrder } = tenantDbServices.catalogue;
        const { id, title, children } = await editCategorySiblingOrder(categoryId, siblingArr);
        const childrenHash = (<TCategoryDoc[]>children).map((child) => {
            return { id: <string>child.id, title: child.title };
        });
        return { id, title, children: childrenHash };
    }

    static async delete(categoryId: string): Promise<void> {
        const { deleteCategory } = tenantDbServices.catalogue;
        await deleteCategory(categoryId);
    }

    static async list(): Promise<ICategory[]> {
        const { getAllCategory } = tenantDbServices.catalogue;
        const allCategory: TCategoryDoc[] = await getAllCategory();
        const categoryList: ICategory[] = [];
        if (!isEmpty(allCategory)) {
            const categoryIdVsCategory: Record<string, TCategoryDoc> = {};
            allCategory.forEach((currCategory) => {
                const currentId = currCategory.id;
                categoryIdVsCategory[currentId] = currCategory;
            });
            //root is always added to start of array
            const rootCategory = allCategory[0];

            if (!isEmpty(rootCategory.children)) {
                for (let topCategoryId of rootCategory.children) {
                    topCategoryId = topCategoryId.toString();
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
        categoryIdVsCategory: Record<string, TCategoryDoc>,
    ): ICategory {
        const categoryHash = <ICategory>{};

        const currCategory = categoryIdVsCategory[categoryId];

        if (!isEmpty(currCategory)) {
            const { id, title, children } = currCategory;
            categoryHash.id = id;
            categoryHash.title = title;
            const childCategoryList: ICategory[] = [];
            if (children.length || children.length !== 0) {
                for (let child of children) {
                    child = child.toString();
                    const childHash = CategoryService.buildCategoryRecursively(
                        child,
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
