import type { Request, Response } from 'express';
import { UtensilioService } from './utensilio.service.js';

const service = new UtensilioService();

export class UtensilioController {
  async getAll(req: Request, res: Response) {
    try {
      const utensilios = await service.getAll();
      res.json(utensilios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los utensilios' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const utensilio = await service.getById(id);
      res.json(utensilio);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const nuevoUtensilio = await service.create(req.body);
      res.status(201).json(nuevoUtensilio);
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