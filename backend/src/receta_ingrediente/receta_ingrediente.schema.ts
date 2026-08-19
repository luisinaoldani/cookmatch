import { z } from 'zod';

const idRef = z.object({
  id: z.number().int().positive(),
});

export const recetaIngredienteCreateSchema = z.object({
  receta: idRef,
  ingrediente: idRef,
  cantidad: z.number({ message: 'La cantidad del ingrediente es obligatoria' }).positive(),
  unidadMedida: z
    .string({ message: 'La unidad de medida es obligatoria' })
    .trim()
    .min(1, 'La unidad de medida es obligatoria')
    .max(100, 'La unidad de medida no puede superar los 100 caracteres'),
});

// Al actualizar, idReceta/idIngrediente ya van en la URL; el service actual
// igual exige `ingrediente` en el body (no cambia la relación, pero valida
// el shape). Se mantiene ese mismo criterio acá.
export const recetaIngredienteUpdateSchema = z.object({
  ingrediente: idRef,
  cantidad: z.number({ message: 'La cantidad del ingrediente es obligatoria' }).positive(),
  unidadMedida: z
    .string({ message: 'La unidad de medida es obligatoria' })
    .trim()
    .min(1, 'La unidad de medida es obligatoria')
    .max(100, 'La unidad de medida no puede superar los 100 caracteres'),
});

export type RecetaIngredienteCreateInput = z.infer<typeof recetaIngredienteCreateSchema>;
export type RecetaIngredienteUpdateInput = z.infer<typeof recetaIngredienteUpdateSchema>;