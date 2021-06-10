import { Router } from 'express';
import { IResponse, ROUTES, STATUS_CODE } from '@sellerspot/universal-types';
import categoryRouter from './category';
import brandRouter from './brand';

const rootRouter = Router();

rootRouter.use('/', categoryRouter);

rootRouter.use('/', brandRouter);

rootRouter.get(ROUTES.CATALOGUE.INFO, (_, res) => {
    res.status(STATUS_CODE.OK).send(<IResponse>{
        status: true,
        data: 'Catalogue server heartbeat',
    });
});

rootRouter.all('*', (_, res) => res.status(STATUS_CODE.NOT_FOUND).send());

export { rootRouter };
