import { Router } from 'express';
import { IResponse, ROUTES, STATUS_CODE } from '@sellerspot/universal-types';
import categoryRouter from './category';
import brandRouter from './brand';
import productRouter from './product';
import taxBracketRouter from './taxSetting';
import stockUnitRouter from './stockUnit';
import outletRouter from './outlet';

const rootRouter = Router();

rootRouter.use('/', categoryRouter);
rootRouter.use('/', brandRouter);
rootRouter.use('/', productRouter);
rootRouter.use('/', taxBracketRouter);
rootRouter.use('/', stockUnitRouter);
rootRouter.use('/', outletRouter);

rootRouter.get(ROUTES.CATALOGUE.INFO, (_, res) => {
    res.status(STATUS_CODE.OK).send(<IResponse>{
        status: true,
        data: 'Catalogue server heartbeat',
    });
});

rootRouter.all('*', (_, res) => res.sendStatus(STATUS_CODE.NOT_FOUND));

export { rootRouter };
