import type { Request, Response } from 'express';
import { EtiquetaService } from './etiqueta.service.js';

// El Controller SOLO se ocupa de: leer el request, llamar al Service,
// y armar la response. No tiene lógica de negocio ni SQL.
const service = new EtiquetaService();

export class EtiquetaController {
  async getAll(req: Request, res: Response) {
    try {
      const etiquetas = await service.getAll();
      res.json(etiquetas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las etiquetas' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const etiqueta = await service.getById(id);
      res.json(etiqueta);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const nuevaEtiqueta = await service.create(req.body);
      res.status(201).json(nuevaEtiqueta);
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