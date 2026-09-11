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

export interface ComidasInput {
  desayuno: number;
  almuerzo: number;
  merienda: number;
  cena: number;
}

export interface DiaInput {
  dia: string;
  comidas: ComidasInput;
}

export interface PlanificacionInput {
  dias: DiaInput[];
}