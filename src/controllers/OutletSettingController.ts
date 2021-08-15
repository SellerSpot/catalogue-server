import { RequestHandler } from 'express';
import {
    IGetOutletSettingResponse,
    IOutletSettingData,
    IUpdateOutletSettingRequest,
    IUpdateOutletSettingResponse,
    STATUS_CODE,
} from '@sellerspot/universal-types';
import OutletSettingService from '../services/OutletSettingService';

export default class OutletSettingController {
    static getOutletSetting: RequestHandler = async (_, res) => {
        const outletSetting: IOutletSettingData = await OutletSettingService.getOutletSetting();
        res.status(STATUS_CODE.OK).send(<IGetOutletSettingResponse>{
            status: true,
            data: outletSetting,
        });
    };

    static updateOutletSetting: RequestHandler = async (req, res) => {
        const updatedOutletSetting: IOutletSettingData = await OutletSettingService.updateOutletSetting(
            <IUpdateOutletSettingRequest>req.body,
        );
        res.status(STATUS_CODE.OK).send(<IUpdateOutletSettingResponse>{
            status: true,
            data: updatedOutletSetting,
        });
    };
}
