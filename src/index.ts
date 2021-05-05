import { logger, middleware } from '@sellerspot/universal-functions';
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
middleware.applyCommon(app);

// router setup
app.use('/', rootRouter);

// error handler
app.use(middleware.errorHandler);

// listeners
app.listen(CONFIG.PORT, () => logger.info(`SellerSpot Auth Server started on PORT ${CONFIG.PORT}`));
