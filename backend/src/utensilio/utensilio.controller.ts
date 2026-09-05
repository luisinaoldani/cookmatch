import type { Request, Response, NextFunction } from 'express';
import { UtensilioService } from './utensilio.service.js';

const service = new UtensilioService();

export class UtensilioController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const utensilios = await service.getAll();
      res.json(utensilios);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const utensilio = await service.getById(id);
      res.json(utensilio);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const nuevoUtensilio = await service.create(req.body);
      res.status(201).json(nuevoUtensilio);
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