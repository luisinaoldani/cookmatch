import { z } from 'zod';

export const etiquetaSchema = z.object({
  nombre: z
    .string({ message: 'El nombre es obligatorio' })
    .trim()
    .min(1, 'El nombre es obligatorio')
    .max(100, 'El nombre no puede superar los 100 caracteres'),
});

export type EtiquetaInput = z.infer<typeof etiquetaSchema>;