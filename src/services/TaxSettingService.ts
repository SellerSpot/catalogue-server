import { tenantDbModels, tenantDbServices } from '@sellerspot/database-models';
import {
    ICreateTaxBracketRequest,
    ICreateTaxGroupRequest,
    IEditTaxBracketRequest,
    IGetAllTaxBracketResponse,
    IGetTaxBracketResponse,
    ITaxBracketData,
    ITaxGroupData,
} from '@sellerspot/universal-types';

type TTaxBracket = tenantDbModels.catalogueModels.ITaxBracketDoc;

export class TaxSettingService {
    // tax bracket

    private static convertToBracketData(taxBracket: TTaxBracket): ITaxBracketData {
        if (!taxBracket) return null;
        const { id, name, rate } = taxBracket;
        return {
            id,
            name,
            rate,
        };
    }

    static async createBracket(bracketProps: ICreateTaxBracketRequest): Promise<ITaxBracketData> {
        const { createTaxBracket } = tenantDbServices.catalogue;
        const taxBracket = await createTaxBracket(bracketProps);
        return TaxSettingService.convertToBracketData(taxBracket);
    }

    static async getAllTaxBrackets(): Promise<IGetAllTaxBracketResponse['data']> {
        const dbServices = tenantDbServices.catalogue;
        const taxBrackets = await dbServices.getAllTaxBrackets();
        return taxBrackets.map((bracket) => TaxSettingService.convertToBracketData(bracket));
    }
    static async getTaxBracket(bracketId: string): Promise<IGetTaxBracketResponse['data']> {
        const dbServices = tenantDbServices.catalogue;
        const taxBracket = await dbServices.getTaxBracket(bracketId);
        return TaxSettingService.convertToBracketData(taxBracket);
    }
    static async editTaxBracket(
        bracketData: IEditTaxBracketRequest,
        bracketId: string,
    ): Promise<ITaxBracketData> {
        const catalogueService = tenantDbServices.catalogue;
        const taxBracket = await catalogueService.editTaxBracket(bracketData, bracketId);
        return TaxSettingService.convertToBracketData(taxBracket);
    }
    static async deleteTaxBracket(bracketId: string): Promise<void> {
        const catalogueService = tenantDbServices.catalogue;
        await catalogueService.deleteTaxBracket(bracketId);
    }

    // tax group

    static async createGroup(groupProps: ICreateTaxGroupRequest): Promise<ITaxGroupData> {
        const { createTaxGroup } = tenantDbServices.catalogue;
        const taxBracket = await createTaxGroup(groupProps);
        return TaxSettingService.getGroupHash(taxBracket);
    }

    // private static buildListTaxBrackets(
    //     taxBrackets: TTaxBracket[],
    // ): IGetAllTaxBracketResponse['data'] {
    //     const taxBracketList: ITaxBracketData[] = [];
    //     const taxGroupList: ITaxGroupData[] = [];
    //     if (taxBrackets && taxBrackets.length > 0) {
    //         taxBrackets.forEach((taxBracket) => {
    //             taxBracket.isGroup
    //                 ? taxGroupList.push(TaxSettingService.getGroupHash(taxBracket))
    //                 : taxBracketList.push(TaxSettingService.convertToBracketData(taxBracket));
    //         });
    //     }
    //     return { brackets: taxBracketList, groups: taxGroupList };
    // }

    private static getGroupHash(taxGroup: TTaxBracket): ITaxGroupData {
        if (!taxGroup) return null;
        const { id, group, name } = taxGroup;
        let groupRate = 0;
        const bracket = (<TTaxBracket[]>group).map((tax) => {
            const currBracketHash = TaxSettingService.convertToBracketData(tax);
            const { rate } = currBracketHash;
            groupRate = groupRate + rate;
            return currBracketHash;
        });
        const groupHash: ITaxGroupData = {
            id,
            name,
            rate: groupRate,
            bracket,
        };
        return groupHash;
    }
}
