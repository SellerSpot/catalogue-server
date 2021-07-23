import { tenantDbModels, tenantDbServices } from '@sellerspot/database-models';
import {
    ICreateTaxBracketRequest,
    IEditTaxBracketRequest,
    IGetAllTaxBracketResponse,
    IGetTaxBracketResponse,
    ITaxBracketData,
} from '@sellerspot/universal-types';

type TTaxBracket = tenantDbModels.catalogueModels.ITaxBracketDoc;

export class TaxBracketService {
    private static convertToBracketData(taxBracket: TTaxBracket): ITaxBracketData {
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

    static async getAllTaxBrackets(): Promise<IGetAllTaxBracketResponse['data']> {
        const catalogueDbService = tenantDbServices.catalogue;
        const taxBrackets = await catalogueDbService.getAllTaxBrackets();
        return taxBrackets.map((bracket) => TaxBracketService.convertToBracketData(bracket));
    }
    static async getTaxBracket(bracketId: string): Promise<IGetTaxBracketResponse['data']> {
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
    // static async createGroup(groupProps: ICreateTaxGroupRequest): Promise<ITaxGroupData> {
    //     const { createTaxGroup } = tenantDbServices.catalogue;
    //     const taxBracket = await createTaxGroup(groupProps);
    //     return TaxSettingService.getGroupData(taxBracket);
    // }
    // private static buildListTaxBrackets(
    //     taxBrackets: TTaxBracket[],
    // ): IGetAllTaxBracketResponse['data'] {
    //     const taxBracketList: ITaxBracketData[] = [];
    //     const taxGroupList: ITaxGroupData[] = [];
    //     if (taxBrackets && taxBrackets.length > 0) {
    //         taxBrackets.forEach((taxBracket) => {
    //             taxBracket.isGroup
    //                 ? taxGroupList.push(TaxSettingService.getGroupData(taxBracket))
    //                 : taxBracketList.push(TaxSettingService.convertToBracketData(taxBracket));
    //         });
    //     }
    //     return { brackets: taxBracketList, groups: taxGroupList };
    // }
    // private static getGroupData(taxGroup: TTaxBracket): ITaxGroupData {
    //     if (!taxGroup) return null;
    //     const { id, group, name } = taxGroup;
    //     let groupRate = 0;
    //     const bracket = (<TTaxBracket[]>group).map((tax) => {
    //         const currBracketData = TaxSettingService.convertToBracketData(tax);
    //         const { rate } = currBracketData;
    //         groupRate = groupRate + rate;
    //         return currBracketData;
    //     });
    //     const groupData: ITaxGroupData = {
    //         id,
    //         name,
    //         rate: groupRate,
    //         bracket,
    //     };
    //     return groupData;
    // }
}
