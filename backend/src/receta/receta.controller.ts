import type { Request, Response, NextFunction } from 'express';
import { RecetaService } from './receta.service.js';

const service = new RecetaService();

export class RecetaController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const etiquetaIds = this.parseIds(req.query.etiquetas);
      if (etiquetaIds === null) {
        res.status(400).json({ error: 'El parámetro etiquetas debe ser una lista de ids numéricos separados por coma' });
        return;
      }

      const restriccionIds = this.parseIds(req.query.restricciones);
      if (restriccionIds === null) {
        res.status(400).json({ error: 'El parámetro restricciones debe ser una lista de ids numéricos separados por coma' });
        return;
      }

      const recetas = await service.getAll(etiquetaIds, restriccionIds);
      res.json(recetas);
    } catch (error) {
      next(error);
    }
  }

  // devuelve [] si el parámetro no vino (sin filtro),
  // null si vino pero es inválido (para poder devolver 400),
  // o la lista de ids parseados si está bien.
  private parseIds(param: unknown): number[] | null {
    if (typeof param !== 'string' || param.trim() === '') return [];
    const ids = param
      .split(',')
      .map((v) => Number(v.trim()))
      .filter((v) => Number.isInteger(v) && v > 0);
    return ids.length > 0 ? ids : null;
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