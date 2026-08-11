import type { Request, Response } from 'express';
import { PasoService } from './paso.service.js';

const service = new PasoService();

export class PasoController {
  async getAll(req: Request, res: Response) {
    try {
      const pasos = await service.getAll();
      res.json(pasos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los pasos' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const idReceta = Number(req.params.idReceta);
      const numero = Number(req.params.numero);
      const paso = await service.getById(idReceta, numero);
      res.json(paso);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const nuevoPaso = await service.create(req.body);
      res.status(201).json(nuevoPaso);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const idReceta = Number(req.params.idReceta);
      const numero = Number(req.params.numero);
      const actualizada = await service.update(idReceta, numero, req.body);
      res.json(actualizada);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const idReceta = Number(req.params.idReceta);
      const numero = Number(req.params.numero);
      await service.delete(idReceta, numero);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}