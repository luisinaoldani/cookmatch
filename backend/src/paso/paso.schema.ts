import { z } from 'zod';

// Al crear, idReceta viaja en el body (no hay URL todavía). numero NO se
// pide nunca: lo calcula el repository.
export const pasoCreateSchema = z.object({
  idReceta: z.number({ message: 'El idReceta es obligatorio' }).int().positive(),
  descripcion: z
    .string({ message: 'La descripción del paso es obligatoria' })
    .trim()
    .min(1, 'La descripción del paso es obligatoria')
    .max(500, 'La descripción no puede superar los 500 caracteres'),
});

// Al actualizar, idReceta y numero ya vienen en la URL (/:idReceta/:numero);
// el body solo trae lo que se puede cambiar.
export const pasoUpdateSchema = z.object({
  descripcion: z
    .string({ message: 'La descripción del paso es obligatoria' })
    .trim()
    .min(1, 'La descripción del paso es obligatoria')
    .max(500, 'La descripción no puede superar los 500 caracteres'),
});

export type PasoCreateInput = z.infer<typeof pasoCreateSchema>;
export type PasoUpdateInput = z.infer<typeof pasoUpdateSchema>;