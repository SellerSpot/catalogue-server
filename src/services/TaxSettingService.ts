import { tenantDbModels, tenantDbServices } from '@sellerspot/database-models';
import {
    ICreateTaxBracketRequest,
    ICreateTaxGroupRequest,
    IEditTaxBracketRequest,
    ITaxBracketData,
    ITaxGroupData,
    ITaxSettingData,
} from '@sellerspot/universal-types';
import { isEmpty, orderBy, pick } from 'lodash';

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
        const catalogueDbService = tenantDbServices.catalogue;
        let taxSettingDocs = await catalogueDbService.searchTaxSetting(query, 'all');
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
        const catalogueDbService = tenantDbServices.catalogue;
        const taxBracketDoc = await catalogueDbService.createTaxBracket(bracketProps);
        return TaxBracketService.convertToBracketData(taxBracketDoc);
    }

    static async getAllTaxBrackets(): Promise<ITaxBracketData[]> {
        const catalogueDbService = tenantDbServices.catalogue;
        const taxBracketDocs = await catalogueDbService.getAllTaxBracket();
        return taxBracketDocs.map((bracket) => TaxBracketService.convertToBracketData(bracket));
    }

    static async getTaxBracket(bracketId: string): Promise<ITaxBracketData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const taxBracketDoc = await catalogueDbService.getTaxBracket(bracketId);
        return TaxBracketService.convertToBracketData(taxBracketDoc);
    }

    static async searchTaxBracket(query: string): Promise<ITaxBracketData[]> {
        const catalogueDbService = tenantDbServices.catalogue;
        const taxBracketDocs = await catalogueDbService.searchTaxSetting(query, 'bracket');
        return taxBracketDocs.map((taxBracketDoc) =>
            TaxBracketService.convertToBracketData(taxBracketDoc),
        );
    }

    static async editTaxBracket(
        bracketData: IEditTaxBracketRequest,
        bracketId: string,
    ): Promise<ITaxBracketData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const taxBracketDoc = await catalogueDbService.editTaxBracket(bracketData, bracketId);
        return TaxBracketService.convertToBracketData(taxBracketDoc);
    }

    static async deleteTaxBracket(bracketId: string): Promise<void> {
        const catalogueDbService = tenantDbServices.catalogue;
        await catalogueDbService.deleteTaxBracket(bracketId);
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
        const catalogueDbService = tenantDbServices.catalogue;
        const taxGroupDocs = await catalogueDbService.getAllTaxGroup();
        return taxGroupDocs.map((taxGroup) => TaxGroupService.convertToTaxGroupData(taxGroup));
    }

    static getTaxGroup = async (taxGroupId: string): Promise<ITaxGroupData> => {
        const catalogueDbService = tenantDbServices.catalogue;
        const taxGroupDoc = await catalogueDbService.getTaxGroup(taxGroupId);
        return TaxGroupService.convertToTaxGroupData(taxGroupDoc);
    };

    static async searchTaxGroup(query: string): Promise<ITaxGroupData[]> {
        const catalogueDbService = tenantDbServices.catalogue;
        const taxGroupDocs = await catalogueDbService.searchTaxSetting(query, 'group');
        return taxGroupDocs.map((taxGroupDoc) =>
            TaxGroupService.convertToTaxGroupData(taxGroupDoc),
        );
    }

    static async createTaxGroup(taxGroupData: ICreateTaxGroupRequest): Promise<ITaxGroupData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const taxGroupDoc = await catalogueDbService.createTaxGroup(taxGroupData);
        return TaxGroupService.convertToTaxGroupData(taxGroupDoc);
    }

    static async editTaxGroup(
        taxGroupData: ICreateTaxGroupRequest,
        taxGroupId: string,
    ): Promise<ITaxGroupData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const taxGroupDoc = await catalogueDbService.editTaxGroup(taxGroupData, taxGroupId);
        return TaxGroupService.convertToTaxGroupData(taxGroupDoc);
    }

    static async deleteTaxGroup(taxGroupId: string): Promise<void> {
        const catalogueDbService = tenantDbServices.catalogue;
        await catalogueDbService.deleteTaxGroup(taxGroupId);
    }
}
