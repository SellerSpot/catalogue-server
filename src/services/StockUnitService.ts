import {
    IStockUnitData,
    IEditStockUnitRequest,
    ICreateStockUnitRequest,
} from '@sellerspot/universal-types';
import { tenantDbServices, tenantDbModels } from '@sellerspot/database-models';

type TStockUnitDoc = tenantDbModels.catalogueModels.IStockUnitDoc;

export class StockUnitService {
    static async getStockUnit(stockUnitId: string): Promise<IStockUnitData> {
        const catalogueService = tenantDbServices.catalogue;
        const stockUnit: TStockUnitDoc = await catalogueService.getStockUnit(stockUnitId);
        return StockUnitService.convertToStockUnitData(stockUnit);
    }

    static async getAllStockUnit(): Promise<IStockUnitData[]> {
        const catalogueService = tenantDbServices.catalogue;
        const stockUnits: TStockUnitDoc[] = await catalogueService.getAllStockUnit();
        const allStockUnits: IStockUnitData[] = stockUnits.map((stockUnit) =>
            StockUnitService.convertToStockUnitData(stockUnit),
        );
        return allStockUnits;
    }

    static async createStockUnit(stockUnit: ICreateStockUnitRequest): Promise<IStockUnitData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const newStockUnit: TStockUnitDoc = await catalogueDbService.createStockUnit(stockUnit);
        return StockUnitService.convertToStockUnitData(newStockUnit);
    }

    static async editStockUnit(
        stockUnitId: string,
        stockUnit: IEditStockUnitRequest,
    ): Promise<IStockUnitData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const editedStockUnit: TStockUnitDoc = await catalogueDbService.editStockUnit(
            stockUnitId,
            stockUnit,
        );
        return StockUnitService.convertToStockUnitData(editedStockUnit);
    }

    static async deleteStockUnit(stockUnitId: string): Promise<void> {
        const catalogueDbService = tenantDbServices.catalogue;
        await catalogueDbService.deleteStockUnit(stockUnitId);
    }

    private static convertToStockUnitData(stockUnit: TStockUnitDoc) {
        if (stockUnit) {
            const { id, name, isDefault } = stockUnit;
            const stockData: IStockUnitData = { id, name, isDefault };
            return stockData;
        }
        return null;
    }
}
