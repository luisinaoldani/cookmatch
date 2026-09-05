import type { Request, Response, NextFunction } from 'express';
import { RecetaService } from './receta.service.js';

const service = new RecetaService();

export class RecetaController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const etiquetasParam = req.query.etiquetas;

      // Listar todo.
      if (typeof etiquetasParam !== 'string' || etiquetasParam.trim() === '') {
        const recetas = await service.getAll();
        res.json(recetas);
        return;
      }

      // Se recibe "1,2,3" -> se convierte en [1, 2, 3], descartando cualquier valor que no sea un
      // entero positivo (esto es query string, no body: no pasa por Zod).
      const etiquetaIds = etiquetasParam
        .split(',')
        .map((valor) => Number(valor.trim()))
        .filter((valor) => Number.isInteger(valor) && valor > 0);

      if (etiquetaIds.length === 0) {
        res.status(400).json({ error: 'El parámetro etiquetas debe ser una lista de ids numéricos separados por coma' });
        return;
      }

      const recetas = await service.getAll(etiquetaIds);
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