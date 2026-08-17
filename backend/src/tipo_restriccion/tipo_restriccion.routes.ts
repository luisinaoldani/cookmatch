import { Router } from 'express';
import { TipoRestriccionController } from './tipo_restriccion.controller.js';

const router = Router();
const controller = new TipoRestriccionController();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
