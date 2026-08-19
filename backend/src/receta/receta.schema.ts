import { z } from 'zod';

const idRef = z.object({
  id: z.number().int().positive(),
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
  // pasos/ingredientes no se validan acá: se crean por su propio endpoint
  // (ver paso.schema.ts / receta_ingrediente.schema.ts), el repository los
  // ignora si llegan en este body.
  etiquetas: z.array(idRef).optional(),
  utensilios: z.array(idRef).optional(),
});

export type RecetaInput = z.infer<typeof recetaSchema>;
