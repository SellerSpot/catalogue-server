import { RequestHandler } from 'express';
import { IOutletData, STATUS_CODE, IGetAllOutletResponse } from '@sellerspot/universal-types';
import OutletService from '../services/OutletService';

export default class OutletController {
    static getAllOutlet: RequestHandler = async (req, res) => {
        const allOutlets: IOutletData[] = await OutletService.getAllOutlet();
        res.status(STATUS_CODE.OK).send(<IGetAllOutletResponse>{
            status: true,
            data: allOutlets,
        });
    };
}
