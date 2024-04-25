import express from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import {WaterJugController} from '../../controllers/waterjug.controller'; 

const router = express.Router();
const waterjugController = new WaterJugController();

router.post(
  '/solve',
  celebrate({
    [Segments.BODY]: {
      jugX: Joi.number().required().positive(),
      jugY: Joi.number().required().positive(),
      targetVolumeZ: Joi.number().required().positive()
    },
  }),
  waterjugController.solve,
);

export default router;
