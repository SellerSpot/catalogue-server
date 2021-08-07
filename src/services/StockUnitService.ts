import { tenantDbServices } from '@sellerspot/database-models';
import {
    ICreateStockUnitRequest,
    IEditStockUnitRequest,
    IStockUnitData,
} from '@sellerspot/universal-types';

export class StockUnitService {
    static async getStockUnit(stockUnitId: string): Promise<IStockUnitData> {
        const { StockUnitDbService } = tenantDbServices.catalogue;
        const stockUnit: IStockUnitData = await StockUnitDbService.getStockUnit(stockUnitId);
        return stockUnit;
    }

    static async getAllStockUnit(): Promise<IStockUnitData[]> {
        const { StockUnitDbService } = tenantDbServices.catalogue;
        const allStockUnits: IStockUnitData[] = await StockUnitDbService.getAllStockUnit();
        return allStockUnits;
    }

    static async createStockUnit(stockUnit: ICreateStockUnitRequest): Promise<IStockUnitData> {
        const { StockUnitDbService } = tenantDbServices.catalogue;
        const newStockUnit: IStockUnitData = await StockUnitDbService.createStockUnit(stockUnit);
        return newStockUnit;
    }

    static async searchStockUnit(query: string): Promise<IStockUnitData[]> {
        const { StockUnitDbService } = tenantDbServices.catalogue;
        const matchedStockUnits: IStockUnitData[] = await StockUnitDbService.searchStockUnit(query);
        return matchedStockUnits;
    }

    static async editStockUnit(
        stockUnitId: string,
        stockUnit: IEditStockUnitRequest,
    ): Promise<IStockUnitData> {
        const { StockUnitDbService } = tenantDbServices.catalogue;
        const editedStockUnit: IStockUnitData = await StockUnitDbService.editStockUnit(
            stockUnitId,
            stockUnit,
        );
        return editedStockUnit;
    }

    static async deleteStockUnit(stockUnitId: string): Promise<void> {
        const { StockUnitDbService } = tenantDbServices.catalogue;
        await StockUnitDbService.deleteStockUnit(stockUnitId);
    }
}
