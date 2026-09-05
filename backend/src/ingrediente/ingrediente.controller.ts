import type { Request, Response, NextFunction } from 'express';
import { IngredienteService } from './ingrediente.service.js';

const service = new IngredienteService();

export class IngredienteController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const ingredientes = await service.getAll();
      res.json(ingredientes);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const ingrediente = await service.getById(id);
      res.json(ingrediente);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const nuevoIngrediente = await service.create(req.body);
      res.status(201).json(nuevoIngrediente);
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