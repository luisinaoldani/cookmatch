//Creamos un manejador de errores para Express que captura errores lanzados en las rutas y devuelve una respuesta HTTP adecuada. Maneja errores de validación de Zod, errores personalizados de la aplicación y errores genéricos del servidor.
import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError } from './errors.js'; //Importa la clase base de errores personalizados de la aplicación para poder identificar y manejar estos errores específicamente.

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {//Define un manejador de errores para Express. 
    //Los parametros son: error (el error lanzado), req (la solicitud), res (la respuesta) y next (la función para pasar al siguiente middleware). 
    //El tipo ErrorRequestHandler asegura que la función tenga la firma correcta para un manejador de errores en Express.
	if (res.headersSent) { //Verifica si los encabezados de la respuesta ya han sido enviados. Si los encabezados ya se enviaron, no se puede modificar la respuesta.
		return next(error); //Si los encabezados ya se enviaron, pasa el error al siguiente manejador de errores en la cadena de middleware de Express.
	}

	if (error instanceof ZodError) {//Verifica si el error es una instancia de ZodError, lo que indica que hubo un error de validación de datos.
		return res.status(400).json({ 
			error: 'Datos inválidos',
			detalle: error.issues.map((issue) => ({//Mapea cada problema de validación a un objeto con el campo y el mensaje de error correspondiente.
                                                //error.issues es un array de objetos que describen cada problema de validación encontrado por Zod.
				campo: issue.path.join('.'), //Indica el campo que causó el error de validación. issue.path es un array que representa la ruta al campo en el objeto de datos, y se une con '.' para formar una cadena legible.
				mensaje: issue.message,
			})),
		});
	}

	if (error instanceof AppError) {//Verifica si el error es una instancia de AppError, lo que indica que es un error personalizado de la aplicación con un código de estado HTTP específico.
		return res.status(error.statusCode).json({ error: error.message }); //Devuelve una respuesta con el código de estado y el mensaje del error personalizado.
	}

	console.error(error); //Si el error no es de Zod ni un AppError, se considera un error genérico del servidor. Se registra el error en la consola para fines de depuración.
	return res.status(500).json({ error: 'Error interno del servidor' });
};
