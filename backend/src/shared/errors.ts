export class AppError extends Error {
	constructor(
		message: string,
		public readonly statusCode: number, 
	) {
		super(message);
		this.name = new.target.name;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}

export class BadRequestError extends AppError {  
	constructor(message = 'Solicitud inválida') {
		super(message, 400);
	}
}

export class NotFoundError extends AppError {
	constructor(message = 'Recurso no encontrado') {
		super(message, 404);
	}
}
