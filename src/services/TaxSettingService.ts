import { tenantDbModels, tenantDbServices } from '@sellerspot/database-models';
import {
    ICreateTaxBracketRequest,
    ICreateTaxGroupRequest,
    IEditTaxBracketRequest,
    ITaxBracketData,
    ITaxGroupData,
} from '@sellerspot/universal-types';

type TTaxBracket = tenantDbModels.catalogueModels.ITaxBracketDoc;

export class TaxBracketService {
    static convertToBracketData(taxBracket: TTaxBracket): ITaxBracketData {
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
        const taxBracket = await catalogueDbService.createTaxBracket(bracketProps);
        return TaxBracketService.convertToBracketData(taxBracket);
    }

    static async getAllTaxBrackets(): Promise<ITaxBracketData[]> {
        const catalogueDbService = tenantDbServices.catalogue;
        const taxBrackets = await catalogueDbService.getAllTaxBracket();
        return taxBrackets.map((bracket) => TaxBracketService.convertToBracketData(bracket));
    }

    static async getTaxBracket(bracketId: string): Promise<ITaxBracketData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const taxBracket = await catalogueDbService.getTaxBracket(bracketId);
        return TaxBracketService.convertToBracketData(taxBracket);
    }

    static async editTaxBracket(
        bracketData: IEditTaxBracketRequest,
        bracketId: string,
    ): Promise<ITaxBracketData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const taxBracket = await catalogueDbService.editTaxBracket(bracketData, bracketId);
        return TaxBracketService.convertToBracketData(taxBracket);
    }

    static async deleteTaxBracket(bracketId: string): Promise<void> {
        const catalogueDbService = tenantDbServices.catalogue;
        await catalogueDbService.deleteTaxBracket(bracketId);
    }
}

export class TaxGroupService {
    private static convertToTaxGroupData(taxGroup: TTaxBracket): ITaxGroupData {
        if (!taxGroup) return null;
        const { id, group, name } = taxGroup;
        let groupRate = 0;
        const bracket = (<TTaxBracket[]>group).map((tax) => {
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
        const taxGroups = await catalogueDbService.getAllTaxGroup();
        return taxGroups.map((taxGroup) => TaxGroupService.convertToTaxGroupData(taxGroup));
    }

    static getTaxGroup = async (taxGroupId: string): Promise<ITaxGroupData> => {
        const catalogueDbService = tenantDbServices.catalogue;
        const taxGroup = await catalogueDbService.getTaxGroup(taxGroupId);
        return TaxGroupService.convertToTaxGroupData(taxGroup);
    };

    static async createTaxGroup(taxGroupData: ICreateTaxGroupRequest): Promise<ITaxGroupData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const taxGroup = await catalogueDbService.createTaxGroup(taxGroupData);
        return TaxGroupService.convertToTaxGroupData(taxGroup);
    }

    static async editTaxGroup(
        taxGroupData: ICreateTaxGroupRequest,
        taxGroupId: string,
    ): Promise<ITaxGroupData> {
        const catalogueDbService = tenantDbServices.catalogue;
        const taxGroup = await catalogueDbService.editTaxGroup(taxGroupData, taxGroupId);
        return TaxGroupService.convertToTaxGroupData(taxGroup);
    }

    static async deleteTaxGroup(taxGroupId: string): Promise<void> {
        const catalogueDbService = tenantDbServices.catalogue;
        await catalogueDbService.deleteTaxGroup(taxGroupId);
    }
}
