import { Router } from 'express';
import { UtensilioController } from './utensilio.controller.js';
import { validar } from '../shared/validar.js';
import { utensilioSchema } from './utensilio.schema.js';

const router = Router();
const controller = new UtensilioController();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', validar(utensilioSchema), controller.create.bind(controller));
router.put('/:id', validar(utensilioSchema), controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;