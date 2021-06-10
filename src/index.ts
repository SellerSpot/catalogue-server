import {
    logger,
    middlewares,
    applyGracefullShutDownHandler,
} from '@sellerspot/universal-functions';
import { CONFIG, configureDB } from 'configs/config';
import expresss from 'express';
import 'express-async-errors';
import { rootRouter } from 'routers/router';
import * as _ from './typings/global';

// globals
const app = expresss();

// db configurations
configureDB();

//common middlewares applied
middlewares.applyCommon(app);

// router setup
app.use('/', rootRouter);

// error handler
app.use(middlewares.errorHandler);

// listeners
const server = app.listen(CONFIG.PORT, () =>
    logger.info(`SellerSpot Catelogue server started on PORT ${CONFIG.PORT}`),
);

applyGracefullShutDownHandler(server);
