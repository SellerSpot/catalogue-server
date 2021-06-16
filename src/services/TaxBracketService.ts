import { tenantDbModels, tenantDbServices } from '@sellerspot/database-models';
import {
    ITaxBracketRequest,
    ITaxBracketData,
    ITaxGroupRequest,
    ITaxGroupData,
    IGetAllTaxBracketResponse,
} from '@sellerspot/universal-types';

type TTaxBracket = tenantDbModels.catalogueModels.ITaxBracket;
export class TaxBracketService {
    static async createBracket(bracketProps: ITaxBracketRequest): Promise<ITaxBracketData> {
        const { createTaxBracket } = tenantDbServices.catalogue;
        const taxBracket = await createTaxBracket(bracketProps);
        return TaxBracketService.getBracketHash(taxBracket);
    }

    static async createGroup(groupProps: ITaxGroupRequest): Promise<ITaxGroupData> {
        const { createTaxGroup } = tenantDbServices.catalogue;
        const taxBracket = await createTaxGroup(groupProps);
        return TaxBracketService.getGroupHash(taxBracket);
    }

    static async list(): Promise<IGetAllTaxBracketResponse['data']> {
        const { getAllTaxBrackets } = tenantDbServices.catalogue;
        const taxBrackets = await getAllTaxBrackets();
        return TaxBracketService.buildListTaxBrackets(taxBrackets);
    }

    private static buildListTaxBrackets(
        taxBrackets: TTaxBracket[],
    ): IGetAllTaxBracketResponse['data'] {
        const taxBracketList: ITaxBracketData[] = [];
        const taxGroupList: ITaxGroupData[] = [];
        if (taxBrackets && taxBrackets.length > 0) {
            taxBrackets.forEach((taxBracket) => {
                taxBracket.isGroup
                    ? taxGroupList.push(TaxBracketService.getGroupHash(taxBracket))
                    : taxBracketList.push(TaxBracketService.getBracketHash(taxBracket));
            });
        }
        return { brackets: taxBracketList, groups: taxGroupList };
    }

    private static getBracketHash(taxBracket: TTaxBracket): ITaxBracketData {
        if (!taxBracket) return null;
        const { id, name, rate } = taxBracket;
        const bracketHash: ITaxBracketData = {
            id,
            name,
            rate,
        };
        return bracketHash;
    }

    private static getGroupHash(taxGroup: TTaxBracket): ITaxGroupData {
        if (!taxGroup) return null;
        const { id, group, name } = taxGroup;
        let groupRate = 0;
        const bracket = (<TTaxBracket[]>group).map((tax) => {
            const currBracketHash = TaxBracketService.getBracketHash(tax);
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
