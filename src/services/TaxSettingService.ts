import { tenantDbServices } from '@sellerspot/database-models';
import {
    ICreateTaxBracketRequest,
    ICreateTaxGroupRequest,
    IEditTaxBracketRequest,
    ITaxBracketData,
    ITaxGroupData,
    ITaxSettingData,
} from '@sellerspot/universal-types';
import { orderBy } from 'lodash';

export class TaxSettingService {
    static async searchTaxSetting(query: string): Promise<ITaxSettingData[]> {
        const { TaxSettingDbService } = tenantDbServices.catalogue;
        let matchedTaxSettings = await TaxSettingDbService.searchTaxSetting(query, 'all');
        // bringing the groups first
        matchedTaxSettings = orderBy(matchedTaxSettings, ['isGroup'], ['desc']);
        return matchedTaxSettings;
    }
}

export class TaxBracketService {
    static async createTaxBracket(
        bracketProps: ICreateTaxBracketRequest,
    ): Promise<ITaxBracketData> {
        const { TaxBracketDbService } = tenantDbServices.catalogue;
        const newTaxBracket = await TaxBracketDbService.createTaxBracket(bracketProps);
        return newTaxBracket;
    }

    static async getAllTaxBrackets(): Promise<ITaxBracketData[]> {
        const { TaxBracketDbService } = tenantDbServices.catalogue;
        const allTaxBrackets = await TaxBracketDbService.getAllTaxBracket();
        return allTaxBrackets;
    }

    static async getTaxBracket(bracketId: string): Promise<ITaxBracketData> {
        const { TaxBracketDbService } = tenantDbServices.catalogue;
        const taxBracket = await TaxBracketDbService.getTaxBracket(bracketId);
        return taxBracket;
    }

    static async searchTaxBracket(query: string): Promise<ITaxBracketData[]> {
        const { TaxSettingDbService } = tenantDbServices.catalogue;
        const matchedTaxBracket = await TaxSettingDbService.searchTaxSetting(query, 'bracket');
        return matchedTaxBracket;
    }

    static async editTaxBracket(
        bracketData: IEditTaxBracketRequest,
        bracketId: string,
    ): Promise<ITaxBracketData> {
        const { TaxBracketDbService } = tenantDbServices.catalogue;
        const updatedTaxBracket = await TaxBracketDbService.editTaxBracket(bracketData, bracketId);
        return updatedTaxBracket;
    }

    static async deleteTaxBracket(bracketId: string): Promise<void> {
        const { TaxBracketDbService } = tenantDbServices.catalogue;
        await TaxBracketDbService.deleteTaxBracket(bracketId);
    }
}

export class TaxGroupService {
    static async getAllTaxGroups(): Promise<ITaxGroupData[]> {
        const { TaxGroupDbService } = tenantDbServices.catalogue;
        const taxGroupDocs = await TaxGroupDbService.getAllTaxGroup();
        return taxGroupDocs;
    }

    static getTaxGroup = async (taxGroupId: string): Promise<ITaxGroupData> => {
        const { TaxGroupDbService } = tenantDbServices.catalogue;
        const taxGroupDoc = await TaxGroupDbService.getTaxGroup(taxGroupId);
        return taxGroupDoc;
    };

    static async searchTaxGroup(query: string): Promise<ITaxGroupData[]> {
        const { TaxSettingDbService } = tenantDbServices.catalogue;
        const matchedTaxGroups = await TaxSettingDbService.searchTaxSetting(query, 'group');
        return matchedTaxGroups as ITaxGroupData[];
    }

    static async createTaxGroup(taxGroupData: ICreateTaxGroupRequest): Promise<ITaxGroupData> {
        const { TaxGroupDbService } = tenantDbServices.catalogue;
        const newTaxGroup = await TaxGroupDbService.createTaxGroup(taxGroupData);
        return newTaxGroup;
    }

    static async editTaxGroup(
        taxGroupData: ICreateTaxGroupRequest,
        taxGroupId: string,
    ): Promise<ITaxGroupData> {
        const { TaxGroupDbService } = tenantDbServices.catalogue;
        const updatedTaxGroup = await TaxGroupDbService.editTaxGroup(taxGroupData, taxGroupId);
        return updatedTaxGroup;
    }

    static async deleteTaxGroup(taxGroupId: string): Promise<void> {
        const { TaxGroupDbService } = tenantDbServices.catalogue;
        await TaxGroupDbService.deleteTaxGroup(taxGroupId);
    }
}
