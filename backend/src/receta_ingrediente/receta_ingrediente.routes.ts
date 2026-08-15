import { Router } from 'express';
import { RecetaIngredienteController } from './receta_ingrediente.controller.js';

const router = Router();
const controller = new RecetaIngredienteController();

router.get('/', controller.getAll.bind(controller));
router.get('/:idReceta/:idIngrediente', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:idReceta/:idIngrediente', controller.update.bind(controller));
router.delete('/:idReceta/:idIngrediente', controller.delete.bind(controller));

export default router;
