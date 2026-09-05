//Definimos errores personalizados para que cada error tenga un código HTTP
export class AppError extends Error { //Crea una clase base para todos los errores propios de la aplicación. Hereda de Error, por lo que tiene message y stack.
	constructor( //recibe un mensaje y un código HTTP que debe devolver la API, que se guardan como propiedades públicas de la instancia. Llama al constructor de Error con el mensaje para inicializar la propiedad message.
		message: string,
		public readonly statusCode: number, 
	) {
		super(message); //Llama al constructor de Error con el mensaje para inicializar la propiedad message.
		this.name = new.target.name; //Establece el nombre del error como el nombre de la clase que lo creó (por ejemplo, NotFoundError). Esto es útil para identificar el tipo de error en los logs o en el manejo de errores.
		Object.setPrototypeOf(this, new.target.prototype); //Asegura que la instancia tenga el prototipo correcto, lo que es necesario para que instanceof funcione correctamente con clases personalizadas.
	}
}

export class BadRequestError extends AppError { //Crea una clase de error específico para solicitudes inválidas. Hereda de AppError.    
	constructor(message = 'Solicitud inválida') {
		super(message, 400);
	}
}

export class NotFoundError extends AppError {//Crea una clase de error específico para recursos no encontrados. Hereda de AppError.
	constructor(message = 'Recurso no encontrado') {
		super(message, 404);
	}
}
