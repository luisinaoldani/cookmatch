import { Router } from 'express';
import { RestriccionAlimentariaController } from './restriccion_alimentaria.controller.js';
import { validar } from '../shared/validar.js';
import { restriccionAlimentariaSchema } from './restriccion_alimentaria.schema.js';

const router = Router();
const controller = new RestriccionAlimentariaController();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', validar(restriccionAlimentariaSchema), controller.create.bind(controller));
router.put('/:id', validar(restriccionAlimentariaSchema), controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
