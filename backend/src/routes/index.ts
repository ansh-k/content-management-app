import express from 'express';
import pageRoutes from './pageRoutes';

const router = express.Router();

router.use('/page', pageRoutes);

export default router;
