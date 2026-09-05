import type { Request, Response, NextFunction } from 'express';
import { RecetaIngredienteService } from './receta_ingrediente.service.js';

const service = new RecetaIngredienteService();

export class RecetaIngredienteController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await service.getAll();
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const idReceta = Number(req.params.idReceta);
      const idIngrediente = Number(req.params.idIngrediente);
      const item = await service.getById(idReceta, idIngrediente);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const nuevoItem = await service.create(req.body);
      res.status(201).json(nuevoItem);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const idReceta = Number(req.params.idReceta);
      const idIngrediente = Number(req.params.idIngrediente);
      const actualizada = await service.update(idReceta, idIngrediente, req.body);
      res.json(actualizada);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const idReceta = Number(req.params.idReceta);
      const idIngrediente = Number(req.params.idIngrediente);
      await service.delete(idReceta, idIngrediente);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
