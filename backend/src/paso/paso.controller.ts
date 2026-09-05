import type { Request, Response, NextFunction } from 'express';
import { PasoService } from './paso.service.js';

const service = new PasoService();

export class PasoController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const pasos = await service.getAll();
      res.json(pasos);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const idReceta = Number(req.params.idReceta);
      const numero = Number(req.params.numero);
      const paso = await service.getById(idReceta, numero);
      res.json(paso);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const nuevoPaso = await service.create(req.body);
      res.status(201).json(nuevoPaso);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const idReceta = Number(req.params.idReceta);
      const numero = Number(req.params.numero);
      const actualizada = await service.update(idReceta, numero, req.body);
      res.json(actualizada);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const idReceta = Number(req.params.idReceta);
      const numero = Number(req.params.numero);
      await service.delete(idReceta, numero);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}