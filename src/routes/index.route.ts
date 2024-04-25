import * as express from 'express';

import waterJugRoutes from './waterjug/waterJug.route';

const router = express.Router();

router.use('/api/waterjug', waterJugRoutes);

export default router;
