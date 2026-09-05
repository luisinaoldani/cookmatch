import type { Request, Response, NextFunction } from 'express';
import { RestriccionAlimentariaService } from './restriccion_alimentaria.service.js';

const service = new RestriccionAlimentariaService();

export class RestriccionAlimentariaController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const restricciones = await service.getAll();
      res.json(restricciones);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const idTipoRestriccion = Number(req.params.idTipoRestriccion);
      const nombre = String(req.params.nombre);
      const restriccion = await service.getById(idTipoRestriccion, nombre);
      res.json(restriccion);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const nuevaRestriccion = await service.create(req.body);
      res.status(201).json(nuevaRestriccion);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const idTipoRestriccion = Number(req.params.idTipoRestriccion);
      const nombre = String(req.params.nombre);
      const actualizada = await service.update(idTipoRestriccion, nombre, req.body);
      res.json(actualizada);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const idTipoRestriccion = Number(req.params.idTipoRestriccion);
      const nombre = String(req.params.nombre);
      await service.delete(idTipoRestriccion, nombre);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
