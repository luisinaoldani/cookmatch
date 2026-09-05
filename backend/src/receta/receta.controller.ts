import type { Request, Response, NextFunction } from 'express';
import { RecetaService } from './receta.service.js';

const service = new RecetaService();

export class RecetaController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const recetas = await service.getAll();
      res.json(recetas);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const receta = await service.getById(id);
      res.json(receta);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const nuevaReceta = await service.create(req.body);
      res.status(201).json(nuevaReceta);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const actualizada = await service.update(id, req.body);
      res.json(actualizada);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await service.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
