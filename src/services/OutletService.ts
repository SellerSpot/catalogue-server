import { IOutletData } from '@sellerspot/universal-types';
import { tenantDbServices } from '@sellerspot/database-models';

export default class OutletService {
    static async getAllOutlet(): Promise<IOutletData[]> {
        const { OutletDbService } = tenantDbServices.catalogue;
        const allOutlet: IOutletData[] = await OutletDbService.getAllOutlet();
        return allOutlet;
    }
}
