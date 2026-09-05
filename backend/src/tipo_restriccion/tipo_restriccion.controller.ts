import type { Request, Response, NextFunction } from 'express';
import { TipoRestriccionService } from './tipo_restriccion.service.js';

const service = new TipoRestriccionService();

export class TipoRestriccionController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tipos = await service.getAll();
      res.json(tipos);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const tipo = await service.getById(id);
      res.json(tipo);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const nuevoTipo = await service.create(req.body);
      res.status(201).json(nuevoTipo);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const actualizado = await service.update(id, req.body);
      res.json(actualizado);
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
