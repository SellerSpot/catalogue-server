import { Router } from 'express';
import { middlewares } from '@sellerspot/universal-functions';
import { ROUTES } from '@sellerspot/universal-types';
import OutletController from '../controllers/OutletController';

const router = Router();

router.get(ROUTES.CATALOGUE.OUTLET.GET_ALL, middlewares.auth, OutletController.getAllOutlet);

export default router;
