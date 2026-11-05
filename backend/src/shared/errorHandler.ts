import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError } from './errors.js';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
	if (res.headersSent) {
		return next(error); 
	}

	if (error instanceof ZodError) {
		return res.status(400).json({ 
			error: 'Datos inválidos',
			detalle: error.issues.map((issue) => ({
				campo: issue.path.join('.'), 
				mensaje: issue.message,
			})),
		});
	}

	if (error instanceof AppError) {
		return res.status(error.statusCode).json({ error: error.message }); 
	}

	console.error(error);
	return res.status(500).json({ error: 'Error interno del servidor' });
};
