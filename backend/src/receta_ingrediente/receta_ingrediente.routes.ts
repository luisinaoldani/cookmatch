import { Router } from 'express';
import { RecetaIngredienteController } from './receta_ingrediente.controller.js';
import { validar } from '../shared/validar.js';
import { recetaIngredienteCreateSchema, recetaIngredienteUpdateSchema } from './receta_ingrediente.schema.js';

const router = Router();
const controller = new RecetaIngredienteController();

router.get('/', controller.getAll.bind(controller));
router.get('/:idReceta/:idIngrediente', controller.getById.bind(controller));
router.post('/', validar(recetaIngredienteCreateSchema), controller.create.bind(controller));
router.put('/:idReceta/:idIngrediente', validar(recetaIngredienteUpdateSchema), controller.update.bind(controller));
router.delete('/:idReceta/:idIngrediente', controller.delete.bind(controller));

export default router;
