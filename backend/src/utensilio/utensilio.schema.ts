import { z } from 'zod';

export const utensilioSchema = z.object({
  nombre: z
  .string({ message: 'El nombre es obligatorio' })
  .trim()
  .min(1, 'El nombre es obligatorio')
  .max(100, 'El nombre no puede superar los 100 caracteres'),
});

export type UtensilioInput = z.infer<typeof utensilioSchema>;