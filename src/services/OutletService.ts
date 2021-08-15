import { tenantDbServices } from '@sellerspot/database-models';
import { ICreateOutletRequest, IEditOutletRequest, IOutletData } from '@sellerspot/universal-types';

export default class OutletService {
    static async getAllOutlet(): Promise<IOutletData[]> {
        const { OutletService: OutletDbService } = tenantDbServices.catalogue;
        const allOutlet: IOutletData[] = await OutletDbService.getAllOutlet();
        return allOutlet;
    }

    static async getOutlet(outletId: string): Promise<IOutletData> {
        const { OutletService: OutletDbService } = tenantDbServices.catalogue;
        const outlet: IOutletData = await OutletDbService.getOutlet(outletId);
        return outlet;
    }

    static async searchOutlet(query: string): Promise<IOutletData[]> {
        const { OutletService: OutletDbService } = tenantDbServices.catalogue;
        const matchedOutlets: IOutletData[] = await OutletDbService.searchOutlet(query);
        return matchedOutlets;
    }

    static async createOutlet(newOutlet: ICreateOutletRequest): Promise<IOutletData> {
        const { OutletService: OutletDbService } = tenantDbServices.catalogue;
        const outlet: IOutletData = await OutletDbService.createOutlet(newOutlet);
        return outlet;
    }

    static async editOutlet(
        outletId: string,
        updatedOutlet: IEditOutletRequest,
    ): Promise<IOutletData> {
        const { OutletService: OutletDbService } = tenantDbServices.catalogue;
        const editedOutlet: IOutletData = await OutletDbService.editOutlet(outletId, updatedOutlet);
        return editedOutlet;
    }

    static async deleteOutlet(outletId: string): Promise<void> {
        const { OutletService: OutletDbService } = tenantDbServices.catalogue;
        await OutletDbService.deleteOutlet(outletId);
    }
}
