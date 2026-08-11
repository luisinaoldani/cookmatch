import { Router } from 'express';
import { EtiquetaController } from './etiqueta.controller.js';

const router = Router();
const controller = new EtiquetaController();

// Bindeamos "this" con .bind(controller) para que cuando Express llame
// a estos métodos, "this" dentro del controller siga apuntando a la
// instancia correcta (si no, se pierde y se rompe con "service is undefined").
router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
