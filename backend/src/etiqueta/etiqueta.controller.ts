import type { Request, Response, NextFunction } from 'express';
import { EtiquetaService } from './etiqueta.service.js';

// El Controller SOLO se ocupa de: leer el request, llamar al Service,
// y armar la response. No tiene lógica de negocio ni SQL.
const service = new EtiquetaService();

export class EtiquetaController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const etiquetas = await service.getAll();
      res.json(etiquetas);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const etiqueta = await service.getById(id);
      res.json(etiqueta);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const nuevaEtiqueta = await service.create(req.body);
      res.status(201).json(nuevaEtiqueta);
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