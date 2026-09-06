// Creamos tipos de la respuesta del CUU Planificar comidas de la semana
// y no un Entity porque Planificacion no persiste. Sirven para darle forma
// al JSON que devuelve el service.

export interface RecetaResumen {
  id: number;
  nombre: string;
  dificultad: string;
  tiempoMin: number;
}

export interface ComidasDelDia {
  desayuno: RecetaResumen;
  almuerzo: RecetaResumen;
  merienda: RecetaResumen;
  cena: RecetaResumen;
}

export interface DiaPlanificado {
  dia: string;
  comidas: ComidasDelDia;
}