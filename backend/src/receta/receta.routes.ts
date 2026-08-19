import { Router } from 'express';
import { RecetaController } from './receta.controller.js';
import { validar } from '../shared/validar.js';
import { recetaSchema } from './receta.schema.js';

const router = Router();
const controller = new RecetaController();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', validar(recetaSchema), controller.create.bind(controller));
router.put('/:id', validar(recetaSchema), controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
