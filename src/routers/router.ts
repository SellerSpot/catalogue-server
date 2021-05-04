import { logger } from '@sellerspot/universal-functions';
import { IResponse, ROUTES, STATUS_CODE } from '@sellerspot/universal-types';
import { default as categoryRouter } from './category';
import { Router } from 'express';

const rootRouter = Router();

rootRouter.use('/categories', categoryRouter);

rootRouter.get(ROUTES.AUTH.INFO, (req, res) => {
    logger.debug(
        `HOST->${req.headers.host} REFERER->${req.headers.referer} ORIGIN->${req.headers.origin}`,
    );
    res.status(STATUS_CODE.OK).send(<IResponse>{
        status: true,
        data: 'Catalogue server heartbeat',
    });
});

rootRouter.all('*', (_, res) => res.status(STATUS_CODE.NOT_FOUND));

export { rootRouter };
