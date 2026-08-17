import { Router } from 'express';
import { RestriccionAlimentariaController } from './restriccion_alimentaria.controller.js';

const router = Router();
const controller = new RestriccionAlimentariaController();

router.get('/', controller.getAll.bind(controller));
router.get('/:idTipoRestriccion/:nombre', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:idTipoRestriccion/:nombre', controller.update.bind(controller));
router.delete('/:idTipoRestriccion/:nombre', controller.delete.bind(controller));

export default router;
