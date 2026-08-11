import { Router } from 'express';
import { UtensilioController } from './utensilio.controller.js';

const router = Router();
const controller = new UtensilioController();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;