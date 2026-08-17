import type { Request, Response } from 'express';
import { RecetaIngredienteService } from './receta_ingrediente.service.js';

const service = new RecetaIngredienteService();

export class RecetaIngredienteController {
  async getAll(req: Request, res: Response) {
    try {
      const items = await service.getAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la relación receta-ingrediente' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const idReceta = Number(req.params.idReceta);
      const idIngrediente = Number(req.params.idIngrediente);
      const item = await service.getById(idReceta, idIngrediente);
      res.json(item);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const nuevoItem = await service.create(req.body);
      res.status(201).json(nuevoItem);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const idReceta = Number(req.params.idReceta);
      const idIngrediente = Number(req.params.idIngrediente);
      const actualizada = await service.update(idReceta, idIngrediente, req.body);
      res.json(actualizada);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const idReceta = Number(req.params.idReceta);
      const idIngrediente = Number(req.params.idIngrediente);
      await service.delete(idReceta, idIngrediente);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}
