import type { Request, Response } from 'express';
import { RecetaService } from './receta.service.js';

const service = new RecetaService();

export class RecetaController {
  async getAll(req: Request, res: Response) {
    try {
      const recetas = await service.getAll();
      res.json(recetas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las recetas' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const receta = await service.getById(id);
      res.json(receta);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const nuevaReceta = await service.create(req.body);
      res.status(201).json(nuevaReceta);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const actualizada = await service.update(id, req.body);
      res.json(actualizada);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await service.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}
