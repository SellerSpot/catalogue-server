import { tenantDbServices } from '@sellerspot/database-models';
import { IOutletSettingData } from '@sellerspot/universal-types';

export default class OutletSettingService {
    static async getOutletSetting(): Promise<IOutletSettingData> {
        const { InfoService } = tenantDbServices.catalogue;
        const allOutletSetting: IOutletSettingData = await InfoService.getOutletSettings();
        return allOutletSetting;
    }

    static async updateOutletSetting(
        newOutletSetting: IOutletSettingData,
    ): Promise<IOutletSettingData> {
        const { InfoService } = tenantDbServices.catalogue;
        const updatedOutletSetting: IOutletSettingData = await InfoService.updateOutletSettings(
            newOutletSetting,
        );
        return updatedOutletSetting;
    }
}
