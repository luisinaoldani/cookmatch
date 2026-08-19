import { z } from 'zod';

export const ingredienteSchema = z.object({
  nombre: z
    .string({ message: 'El nombre es obligatorio' })
    .trim()
    .min(1, 'El nombre es obligatorio')
    .max(45, 'El nombre no puede superar los 45 caracteres'),
});

export type IngredienteInput = z.infer<typeof ingredienteSchema>;