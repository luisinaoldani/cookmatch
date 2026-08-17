import type { Request, Response } from 'express';
import { RestriccionAlimentariaService } from './restriccion_alimentaria.service.js';

const service = new RestriccionAlimentariaService();

export class RestriccionAlimentariaController {
  async getAll(req: Request, res: Response) {
    try {
      const restricciones = await service.getAll();
      res.json(restricciones);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las restricciones alimentarias' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const idTipoRestriccion = Number(req.params.idTipoRestriccion);
      const nombre = String(req.params.nombre);
      const restriccion = await service.getById(idTipoRestriccion, nombre);
      res.json(restriccion);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const nuevaRestriccion = await service.create(req.body);
      res.status(201).json(nuevaRestriccion);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const idTipoRestriccion = Number(req.params.idTipoRestriccion);
      const nombre = String(req.params.nombre);
      const actualizada = await service.update(idTipoRestriccion, nombre, req.body);
      res.json(actualizada);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const idTipoRestriccion = Number(req.params.idTipoRestriccion);
      const nombre = String(req.params.nombre);
      await service.delete(idTipoRestriccion, nombre);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}
