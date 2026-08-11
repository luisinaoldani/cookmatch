import { Router } from 'express';
import { PasoController } from './paso.controller.js';

const router = Router();
const controller = new PasoController();

router.get('/', controller.getAll.bind(controller));
router.get('/:idReceta/:numero', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:idReceta/:numero', controller.update.bind(controller));
router.delete('/:idReceta/:numero', controller.delete.bind(controller));

export default router;