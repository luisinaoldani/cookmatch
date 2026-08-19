import { Router } from 'express';
import { IngredienteController } from './ingrediente.controller.js';
import { validar } from '../shared/validar.js';
import { ingredienteSchema } from './ingrediente.schema.js';

const router = Router();
const controller = new IngredienteController();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', validar(ingredienteSchema), controller.create.bind(controller));
router.put('/:id', validar(ingredienteSchema), controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;