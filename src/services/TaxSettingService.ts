import { tenantDbModels, tenantDbServices } from '@sellerspot/database-models';
import {
    ICreateTaxBracketRequest,
    ICreateTaxGroupRequest,
    IEditTaxBracketRequest,
    ITaxBracketData,
    ITaxGroupData,
    ITaxSettingData,
} from '@sellerspot/universal-types';
import { orderBy } from 'lodash';

type TTaxSettingDoc = tenantDbModels.catalogueModels.ITaxSettingDoc;

export class TaxSettingService {
    static convertToTaxSettingData = (
        taxSettingDoc: TTaxSettingDoc,
    ): ITaxBracketData | ITaxGroupData => {
        if (!taxSettingDoc) return null;
        const { isGroup } = taxSettingDoc;
        if (isGroup) {
            return TaxGroupService.convertToTaxGroupData(taxSettingDoc);
        } else {
            return TaxBracketService.convertToBracketData(taxSettingDoc);
        }
    };

    static async searchTaxSetting(query: string): Promise<ITaxSettingData[]> {
        const { TaxSettingDbService } = tenantDbServices.catalogue;
        let taxSettingDocs = await TaxSettingDbService.searchTaxSetting(query, 'all');
        // bringing the groups first
        taxSettingDocs = orderBy(taxSettingDocs, ['isGroup'], ['desc']);
        return taxSettingDocs.map((taxSettingDoc) =>
            TaxSettingService.convertToTaxSettingData(taxSettingDoc),
        );
    }
}

export class TaxBracketService {
    static convertToBracketData(taxBracket: TTaxSettingDoc): ITaxBracketData {
        if (!taxBracket) return null;
        const { id, name, rate } = taxBracket;
        return {
            id,
            name,
            rate,
        };
    }

    static async createTaxBracket(
        bracketProps: ICreateTaxBracketRequest,
    ): Promise<ITaxBracketData> {
        const { TaxBracketDbService } = tenantDbServices.catalogue;
        const taxBracketDoc = await TaxBracketDbService.createTaxBracket(bracketProps);
        return TaxBracketService.convertToBracketData(taxBracketDoc);
    }

    static async getAllTaxBrackets(): Promise<ITaxBracketData[]> {
        const { TaxBracketDbService } = tenantDbServices.catalogue;
        const taxBracketDocs = await TaxBracketDbService.getAllTaxBracket();
        return taxBracketDocs.map((bracket) => TaxBracketService.convertToBracketData(bracket));
    }

    static async getTaxBracket(bracketId: string): Promise<ITaxBracketData> {
        const { TaxBracketDbService } = tenantDbServices.catalogue;
        const taxBracketDoc = await TaxBracketDbService.getTaxBracket(bracketId);
        return TaxBracketService.convertToBracketData(taxBracketDoc);
    }

    static async searchTaxBracket(query: string): Promise<ITaxBracketData[]> {
        const { TaxSettingDbService } = tenantDbServices.catalogue;
        const taxBracketDocs = await TaxSettingDbService.searchTaxSetting(query, 'bracket');
        return taxBracketDocs.map((taxBracketDoc) =>
            TaxBracketService.convertToBracketData(taxBracketDoc),
        );
    }

    static async editTaxBracket(
        bracketData: IEditTaxBracketRequest,
        bracketId: string,
    ): Promise<ITaxBracketData> {
        const { TaxBracketDbService } = tenantDbServices.catalogue;
        const taxBracketDoc = await TaxBracketDbService.editTaxBracket(bracketData, bracketId);
        return TaxBracketService.convertToBracketData(taxBracketDoc);
    }

    static async deleteTaxBracket(bracketId: string): Promise<void> {
        const { TaxBracketDbService } = tenantDbServices.catalogue;
        await TaxBracketDbService.deleteTaxBracket(bracketId);
    }
}

export class TaxGroupService {
    static convertToTaxGroupData(taxGroupDoc: TTaxSettingDoc): ITaxGroupData {
        if (!taxGroupDoc) return null;
        const { id, group, name } = taxGroupDoc;
        let groupRate = 0;
        const bracket = (<TTaxSettingDoc[]>group).map((tax) => {
            const currBracketData = TaxBracketService.convertToBracketData(tax);
            const { rate } = currBracketData;
            groupRate = groupRate + rate;
            return currBracketData;
        });
        const groupData: ITaxGroupData = {
            id,
            name,
            rate: groupRate,
            bracket,
        };
        return groupData;
    }

    static async getAllTaxGroups(): Promise<ITaxGroupData[]> {
        const { TaxGroupDbService } = tenantDbServices.catalogue;
        const taxGroupDocs = await TaxGroupDbService.getAllTaxGroup();
        return taxGroupDocs.map((taxGroup) => TaxGroupService.convertToTaxGroupData(taxGroup));
    }

    static getTaxGroup = async (taxGroupId: string): Promise<ITaxGroupData> => {
        const { TaxGroupDbService } = tenantDbServices.catalogue;
        const taxGroupDoc = await TaxGroupDbService.getTaxGroup(taxGroupId);
        return TaxGroupService.convertToTaxGroupData(taxGroupDoc);
    };

    static async searchTaxGroup(query: string): Promise<ITaxGroupData[]> {
        const { TaxSettingDbService } = tenantDbServices.catalogue;
        const taxGroupDocs = await TaxSettingDbService.searchTaxSetting(query, 'group');
        return taxGroupDocs.map((taxGroupDoc) =>
            TaxGroupService.convertToTaxGroupData(taxGroupDoc),
        );
    }

    static async createTaxGroup(taxGroupData: ICreateTaxGroupRequest): Promise<ITaxGroupData> {
        const { TaxGroupDbService } = tenantDbServices.catalogue;
        const taxGroupDoc = await TaxGroupDbService.createTaxGroup(taxGroupData);
        return TaxGroupService.convertToTaxGroupData(taxGroupDoc);
    }

    static async editTaxGroup(
        taxGroupData: ICreateTaxGroupRequest,
        taxGroupId: string,
    ): Promise<ITaxGroupData> {
        const { TaxGroupDbService } = tenantDbServices.catalogue;
        const taxGroupDoc = await TaxGroupDbService.editTaxGroup(taxGroupData, taxGroupId);
        return TaxGroupService.convertToTaxGroupData(taxGroupDoc);
    }

    static async deleteTaxGroup(taxGroupId: string): Promise<void> {
        const { TaxGroupDbService } = tenantDbServices.catalogue;
        await TaxGroupDbService.deleteTaxGroup(taxGroupId);
    }
}
