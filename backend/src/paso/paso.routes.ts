import { Router } from 'express';
import { PasoController } from './paso.controller.js';
import { validar } from '../shared/validar.js';
import { pasoCreateSchema, pasoUpdateSchema } from './paso.schema.js';

const router = Router();
const controller = new PasoController();

router.get('/', controller.getAll.bind(controller));
router.get('/:idReceta/:numero', controller.getById.bind(controller));
router.post('/', validar(pasoCreateSchema), controller.create.bind(controller));
router.put('/:idReceta/:numero', validar(pasoUpdateSchema), controller.update.bind(controller));
router.delete('/:idReceta/:numero', controller.delete.bind(controller));

export default router;