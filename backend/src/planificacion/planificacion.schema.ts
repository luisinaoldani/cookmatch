import { z } from 'zod';

const DIAS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'] as const;

const comidasDelDiaSchema = z.object({
  desayuno: z.number({ message: 'Falta la receta de desayuno' }).int().positive(),
  almuerzo: z.number({ message: 'Falta la receta de almuerzo' }).int().positive(),
  merienda: z.number({ message: 'Falta la receta de merienda' }).int().positive(),
  cena: z.number({ message: 'Falta la receta de cena' }).int().positive(),
});

const diaSchema = z.object({
  dia: z.enum(DIAS, { message: 'Día inválido' }),
  comidas: comidasDelDiaSchema,
});

export const planificacionSchema = z.object({
  dias: z
    .array(diaSchema)
    .length(7, 'La planificación debe tener los 7 días de la semana')
    .refine(
      (dias) => new Set(dias.map((d) => d.dia)).size === dias.length,
      { message: 'No puede haber días repetidos' },
    ),
});

export type PlanificacionInput = z.infer<typeof planificacionSchema>;