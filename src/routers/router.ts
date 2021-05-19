import { IResponse, ROUTES, STATUS_CODE } from '@sellerspot/universal-types';
import { default as categoryRouter } from './category';
import { Router } from 'express';

const rootRouter = Router();

rootRouter.use('/', categoryRouter);

rootRouter.get(ROUTES.CATALOGUE.INFO, (_, res) => {
    res.status(STATUS_CODE.OK).send(<IResponse>{
        status: true,
        data: 'Catalogue server heartbeat',
    });
});

rootRouter.all('*', (_, res) => res.status(STATUS_CODE.NOT_FOUND));

export { rootRouter };
