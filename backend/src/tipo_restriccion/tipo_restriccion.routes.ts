import { Router } from 'express';
import { TipoRestriccionController } from './tipo_restriccion.controller.js';
import { tipoRestriccionSchema } from './tipo_restriccion.schema.js';
import { validar } from '../shared/validar.js';

const router = Router();
const controller = new TipoRestriccionController();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', validar(tipoRestriccionSchema), controller.create.bind(controller));
router.put('/:id', validar(tipoRestriccionSchema), controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
