import { z } from 'zod';

const idRef = z.object({
  id: z.number().int().positive(),
});

const recetaIngredienteItem = z.object({
  ingrediente: idRef,
  cantidad: z.number({ message: 'La cantidad del ingrediente es obligatoria' }).positive(),
  unidadMedida: z
    .string({ message: 'La unidad de medida es obligatoria' })
    .trim()
    .min(1, 'La unidad de medida es obligatoria')
    .max(100, 'La unidad de medida no puede superar los 100 caracteres'),
});

const recetaPasoItem = z.object({
  descripcion: z
    .string({ message: 'La descripción del paso es obligatoria' })
    .trim()
    .min(1, 'La descripción del paso es obligatoria')
    .max(500, 'La descripción no puede superar los 500 caracteres'),
});

export const recetaSchema = z.object({
  nombre: z
    .string({ message: 'El nombre de la receta es obligatorio' })
    .trim()
    .min(1, 'El nombre de la receta es obligatorio')
    .max(100, 'El nombre no puede superar los 100 caracteres'),
  dificultad: z
    .string({ message: 'La dificultad de la receta es obligatoria' })
    .trim()
    .min(1, 'La dificultad de la receta es obligatoria')
    .max(100, 'La dificultad no puede superar los 100 caracteres'),
  tiempoMin: z.number({ message: 'El tiempo de la receta es obligatorio' }).positive(),
  estado: z
    .string({ message: 'El estado de la receta es obligatorio' })
    .trim()
    .min(1, 'El estado de la receta es obligatorio')
    .max(100, 'El estado no puede superar los 100 caracteres'),
  pasos: z.array(recetaPasoItem).optional(),
  ingredientes: z
    .array(recetaIngredienteItem)
    .refine(
      (lista) => new Set(lista.map((i) => i.ingrediente.id)).size === lista.length,
      'No se puede repetir un ingrediente en la receta',
    )
    .optional(),
  etiquetas: z.array(idRef).optional(),
  utensilios: z.array(idRef).optional(),
  restricciones: z.array(idRef).optional(),
});

export type RecetaInput = z.infer<typeof recetaSchema>;