import type { Request, Response, NextFunction } from 'express';
import type { ZodTypeAny } from 'zod';

// Recibe un esquema y devuelve un middleware: una función de orden superior,
// como las de la unidad de funciones — pero tipada.
export function validar(schema: ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      return res.status(400).json({
        error: 'Datos inválidos',
        detalle: resultado.error.issues.map((i) => ({
          campo: i.path.join('.'),
          mensaje: i.message,
        })),
      });
    }

    req.body = resultado.data;  // body limpio y validado para el controller
    next();
  };
}