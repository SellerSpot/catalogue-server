import { Router } from 'express';
import { middleware } from '@sellerspot/universal-functions';
import { dbMiddleware } from '@sellerspot/database-models';
import { categorySchema } from 'schemas/schema';

const router = Router();

router.post(
    '/',
    middleware.auth,
    dbMiddleware.setTenantDb,
    middleware.validateSchema(categorySchema.createCategory),
);

export default router;
