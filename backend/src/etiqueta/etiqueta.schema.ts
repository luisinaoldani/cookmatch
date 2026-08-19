import { z } from 'zod';

export const etiquetaSchema = z.object({
  nombre: z
    .string({ message: 'El nombre es obligatorio' })
    .trim()
    .min(1, 'El nombre es obligatorio')
    .max(100, 'El nombre no puede superar los 100 caracteres'),
});

// La línea que evita las "dos verdades": el tipo se deriva del schema,
// no se vuelve a escribir a mano en el Service.
export type EtiquetaInput = z.infer<typeof etiquetaSchema>;