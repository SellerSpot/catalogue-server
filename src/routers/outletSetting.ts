import { Router } from 'express';
import { middlewares } from '../../.yalc/@sellerspot/universal-functions/dist';
import { ROUTES } from '../../.yalc/@sellerspot/universal-types/dist';
import OutletSettingController from '../controllers/OutletSettingController';
import { OutletSettingSchema } from '../schemas/OutletSettingSchema';

const router = Router();

router.get(
    ROUTES.CATALOGUE.OUTLET_SETTING.GET,
    middlewares.auth,
    OutletSettingController.getOutletSetting,
);

router.put(
    ROUTES.CATALOGUE.OUTLET_SETTING.UPDATE,
    middlewares.validateSchema({ bodySchema: OutletSettingSchema.updateOutlet }),
    middlewares.auth,
    OutletSettingController.updateOutletSetting,
);

export default router;
