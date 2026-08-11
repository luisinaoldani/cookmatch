import type { Request, Response } from 'express';
import { IngredienteService } from './ingrediente.service.js';

const service = new IngredienteService();

export class IngredienteController {
  async getAll(req: Request, res: Response) {
    try {
      const ingredientes = await service.getAll();
      res.json(ingredientes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los ingredientes' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const ingrediente = await service.getById(id);
      res.json(ingrediente);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const nuevoIngrediente = await service.create(req.body);
      res.status(201).json(nuevoIngrediente);
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