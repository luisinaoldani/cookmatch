import type { Request, Response } from 'express';
import { TipoRestriccionService } from './tipo_restriccion.service.js';

const service = new TipoRestriccionService();

export class TipoRestriccionController {
  async getAll(req: Request, res: Response) {
    try {
      const tipos = await service.getAll();
      res.json(tipos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los tipos de restricción' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const tipo = await service.getById(id);
      res.json(tipo);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const nuevoTipo = await service.create(req.body);
      res.status(201).json(nuevoTipo);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const actualizado = await service.update(id, req.body);
      res.json(actualizado);
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
