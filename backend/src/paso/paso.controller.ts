import type { Request, Response, NextFunction } from 'express';
import { PasoService } from './paso.service.js';
import { BadRequestError } from '../shared/errors.js';

const service = new PasoService();

export class PasoController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // GET /pasos?idReceta=3 devuelve solo los pasos de la receta 3.
      // Sin el parámetro devuelve todos, como antes.
      const idReceta =
        req.query.idReceta !== undefined ? Number(req.query.idReceta) : undefined;

      if (idReceta !== undefined && (!Number.isInteger(idReceta) || idReceta <= 0)) {
        throw new BadRequestError('idReceta debe ser un número entero positivo');
      }

      const pasos = await service.getAll(idReceta);
      res.json(pasos);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const idReceta = Number(req.params.idReceta);
      const numero = Number(req.params.numero);
      const paso = await service.getById(idReceta, numero);
      res.json(paso);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const nuevoPaso = await service.create(req.body);
      res.status(201).json(nuevoPaso);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const idReceta = Number(req.params.idReceta);
      const numero = Number(req.params.numero);
      const actualizada = await service.update(idReceta, numero, req.body);
      res.json(actualizada);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const idReceta = Number(req.params.idReceta);
      const numero = Number(req.params.numero);
      await service.delete(idReceta, numero);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}