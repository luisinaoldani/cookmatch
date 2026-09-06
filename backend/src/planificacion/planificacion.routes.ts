import { Router } from 'express';
import { PlanificacionController } from './planificacion.controller.js';
import { validar } from '../shared/validar.js';
import { planificacionSchema } from './planificacion.schema.js';

const router = Router();
const controller = new PlanificacionController();

router.post('/generar', validar(planificacionSchema), controller.generar.bind(controller));

export default router;