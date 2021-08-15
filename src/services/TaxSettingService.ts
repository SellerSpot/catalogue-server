import { tenantDbServices } from '@sellerspot/database-models';
import {
    ICreateTaxBracketRequest,
    IEditTaxBracketRequest,
    ITaxBracketData,
} from '@sellerspot/universal-types';

export class TaxBracketService {
    static async getAllBracketsAndGroups(): Promise<ITaxBracketData[]> {
        const { TaxBracketService: TaxBracketDbService } = tenantDbServices.catalogue;
        const allTaxBrackets = await TaxBracketDbService.getAllTaxBracketsAndGroups();
        return allTaxBrackets;
    }

    static async searchAllBracketAndGroup(query: string): Promise<ITaxBracketData[]> {
        const { TaxBracketService: TaxSettingDbService } = tenantDbServices.catalogue;
        const matchedTaxBracket = await TaxSettingDbService.searchTaxSetting(query, 'all');
        return matchedTaxBracket;
    }

    static async createBracket(bracketProps: ICreateTaxBracketRequest): Promise<ITaxBracketData> {
        const { TaxBracketService: TaxBracketDbService } = tenantDbServices.catalogue;
        const newTaxBracket = await TaxBracketDbService.createTaxBracket(bracketProps);
        return newTaxBracket;
    }

    static async getOnlyBrackets(): Promise<ITaxBracketData[]> {
        const { TaxBracketService: TaxBracketDbService } = tenantDbServices.catalogue;
        const allTaxBrackets = await TaxBracketDbService.getOnlyTaxBrackets();
        return allTaxBrackets;
    }

    static async getBracket(bracketId: string): Promise<ITaxBracketData> {
        const { TaxBracketService: TaxBracketDbService } = tenantDbServices.catalogue;
        const taxBracket = await TaxBracketDbService.getTaxBracket(bracketId);
        return taxBracket;
    }

    static async searchBracket(query: string): Promise<ITaxBracketData[]> {
        const { TaxBracketService: TaxSettingDbService } = tenantDbServices.catalogue;
        const matchedTaxBracket = await TaxSettingDbService.searchTaxSetting(query, 'onlyBrackets');
        return matchedTaxBracket;
    }

    static async editBracket(
        bracketData: IEditTaxBracketRequest,
        bracketId: string,
    ): Promise<ITaxBracketData> {
        const { TaxBracketService: TaxBracketDbService } = tenantDbServices.catalogue;
        const updatedTaxBracket = await TaxBracketDbService.editTaxBracket(bracketId, bracketData);
        return updatedTaxBracket;
    }

    static async deleteBracket(bracketId: string): Promise<void> {
        const { TaxBracketService: TaxBracketDbService } = tenantDbServices.catalogue;
        await TaxBracketDbService.deleteTaxBracket(bracketId);
    }

    static async createGroup(
        bracketGroupProps: ICreateTaxBracketRequest,
    ): Promise<ITaxBracketData> {
        const { TaxBracketService: TaxBracketDbService } = tenantDbServices.catalogue;
        const newTaxBracket = await TaxBracketDbService.createTaxGroup(bracketGroupProps);
        return newTaxBracket;
    }

    static async getOnlyGroups(): Promise<ITaxBracketData[]> {
        const { TaxBracketService: TaxBracketDbService } = tenantDbServices.catalogue;
        const allTaxBrackets = await TaxBracketDbService.getOnlyTaxGroups();
        return allTaxBrackets;
    }

    static async getGroup(bracketGroupId: string): Promise<ITaxBracketData> {
        const { TaxBracketService: TaxBracketDbService } = tenantDbServices.catalogue;
        const taxBracket = await TaxBracketDbService.getTaxGroup(bracketGroupId);
        return taxBracket;
    }

    static async searchGroup(query: string): Promise<ITaxBracketData[]> {
        const { TaxBracketService: TaxSettingDbService } = tenantDbServices.catalogue;
        const matchedTaxBracket = await TaxSettingDbService.searchTaxSetting(query, 'onlyGroups');
        return matchedTaxBracket;
    }

    static async editGroup(
        bracketGroupData: IEditTaxBracketRequest,
        bracketId: string,
    ): Promise<ITaxBracketData> {
        const { TaxBracketService: TaxBracketDbService } = tenantDbServices.catalogue;
        const updatedTaxBracket = await TaxBracketDbService.editTaxGroup(
            bracketId,
            bracketGroupData,
        );
        return updatedTaxBracket;
    }

    static async deleteGroup(bracketId: string): Promise<void> {
        const { TaxBracketService: TaxBracketDbService } = tenantDbServices.catalogue;
        await TaxBracketDbService.deleteTaxGroup(bracketId);
    }
}
