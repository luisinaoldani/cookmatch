import { z } from 'zod';

export const restriccionAlimentariaSchema = z.object({
  tipoRestriccion: z.object({
    id: z.number({ message: 'Debe enviarse un tipo de restricción válido' }).int().positive(),
  }),
  nombre: z
    .string({ message: 'El nombre es obligatorio' })
    .trim()
    .min(1, 'El nombre es obligatorio')
    .max(100, 'El nombre no puede superar los 100 caracteres'),
  descripcion: z
    .string()
    .trim()
    .max(500, 'La descripción no puede superar los 500 caracteres')
    .optional(),
});

export type RestriccionAlimentariaInput = z.infer<typeof restriccionAlimentariaSchema>;