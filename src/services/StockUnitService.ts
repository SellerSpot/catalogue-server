import {
    IStockUnitData,
    IEditStockUnitRequest,
    ICreateStockUnitRequest,
} from '@sellerspot/universal-types';
import { tenantDbServices, tenantDbModels } from '@sellerspot/database-models';

type TStockUnitDoc = tenantDbModels.catalogueModels.IStockUnitDoc;

export class StockUnitService {
    static async getStockUnit(stockUnitId: string): Promise<IStockUnitData> {
        const { StockUnitDbService } = tenantDbServices.catalogue;
        const stockUnit: TStockUnitDoc = await StockUnitDbService.getStockUnit(stockUnitId);
        return StockUnitService.convertToStockUnitData(stockUnit);
    }

    static async getAllStockUnit(): Promise<IStockUnitData[]> {
        const { StockUnitDbService } = tenantDbServices.catalogue;
        const stockUnits: TStockUnitDoc[] = await StockUnitDbService.getAllStockUnit();
        const allStockUnits: IStockUnitData[] = stockUnits.map((stockUnit) =>
            StockUnitService.convertToStockUnitData(stockUnit),
        );
        return allStockUnits;
    }

    static async createStockUnit(stockUnit: ICreateStockUnitRequest): Promise<IStockUnitData> {
        const { StockUnitDbService } = tenantDbServices.catalogue;
        const newStockUnit: TStockUnitDoc = await StockUnitDbService.createStockUnit(stockUnit);
        return StockUnitService.convertToStockUnitData(newStockUnit);
    }

    static async searchStockUnit(query: string): Promise<IStockUnitData[]> {
        const { StockUnitDbService } = tenantDbServices.catalogue;
        const matchedStockUnits: TStockUnitDoc[] = await StockUnitDbService.searchStockUnit(query);
        return matchedStockUnits.map((brand) => StockUnitService.convertToStockUnitData(brand));
    }

    static async editStockUnit(
        stockUnitId: string,
        stockUnit: IEditStockUnitRequest,
    ): Promise<IStockUnitData> {
        const { StockUnitDbService } = tenantDbServices.catalogue;
        const editedStockUnit: TStockUnitDoc = await StockUnitDbService.editStockUnit(
            stockUnitId,
            stockUnit,
        );
        return StockUnitService.convertToStockUnitData(editedStockUnit);
    }

    static async deleteStockUnit(stockUnitId: string): Promise<void> {
        const { StockUnitDbService } = tenantDbServices.catalogue;
        await StockUnitDbService.deleteStockUnit(stockUnitId);
    }

    private static convertToStockUnitData(stockUnit: TStockUnitDoc) {
        if (stockUnit) {
            const { id, name, unit, isDefault } = stockUnit;
            const stockData: IStockUnitData = { id, name, unit, isDefault };
            return stockData;
        }
        return null;
    }
}
