import {
    IStockUnitData,
    IEditStockUnitRequest,
    ICreateStockUnitRequest,
} from '@sellerspot/universal-types';
import { tenantDbServices, tenantDbModels } from '@sellerspot/database-models';

type TStockUnitDoc = tenantDbModels.catalogueModels.IStockUnitDoc;

export class StockUnitService {
    static async show(stockUnitId: string): Promise<IStockUnitData> {
        const { getStockUnit } = tenantDbServices.catalogue;
        const stockUnit: TStockUnitDoc = await getStockUnit(stockUnitId);
        return StockUnitService.getHash(stockUnit);
    }

    static async list(): Promise<IStockUnitData[]> {
        const { getAllStockUnit } = tenantDbServices.catalogue;
        const stockUnits: TStockUnitDoc[] = await getAllStockUnit();
        const allStockUnits: IStockUnitData[] = stockUnits.map((stockUnit) =>
            StockUnitService.getHash(stockUnit),
        );
        return allStockUnits;
    }

    static async create(stockUnit: ICreateStockUnitRequest): Promise<IStockUnitData> {
        const { createStockUnit } = tenantDbServices.catalogue;
        const newStockUnit: TStockUnitDoc = await createStockUnit(stockUnit);
        return StockUnitService.getHash(newStockUnit);
    }

    static async edit(
        stockUnitId: string,
        stockUnit: IEditStockUnitRequest,
    ): Promise<IStockUnitData> {
        const { editStockUnit } = tenantDbServices.catalogue;
        const editedStockUnit: TStockUnitDoc = await editStockUnit(stockUnitId, stockUnit);
        return StockUnitService.getHash(editedStockUnit);
    }

    static async delete(stockUnitId: string): Promise<void> {
        const { deleteStockUnit } = tenantDbServices.catalogue;
        await deleteStockUnit(stockUnitId);
    }

    private static getHash(stockUnit: TStockUnitDoc) {
        if (stockUnit) {
            const { id, name, isDefault } = stockUnit;
            const stockHash: IStockUnitData = { id, name, isDefault };
            return stockHash;
        }
        return null;
    }
}
