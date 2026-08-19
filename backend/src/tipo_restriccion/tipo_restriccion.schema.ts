import { z } from 'zod';

export const tipoRestriccionSchema = z.object({
  tipo: z
    .string({ message: 'El tipo de restricción es obligatorio' })
    .trim()
    .min(1, 'El tipo de restricción es obligatorio')
    .max(100, 'El tipo no puede superar los 100 caracteres'),
});

export type TipoRestriccionInput = z.infer<typeof tipoRestriccionSchema>;