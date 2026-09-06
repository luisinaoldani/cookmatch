import type { Request, Response, NextFunction } from 'express';
import { PlanificacionService } from './planificacion.service.js';

const service = new PlanificacionService();

export class PlanificacionController {
  async generar(req: Request, res: Response, next: NextFunction) {
    try {
      const planificacion = await service.generar(req.body);
      res.json(planificacion);
    } catch (error) {
      next(error);
    }
  }
}