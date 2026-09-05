import { Receta } from "../../entities/receta.entity";

export const RecetaMock: Receta[] = [
  {
    id: 1,
    nombre: "Milanesas con puré",
    dificultad: "Media",
    tiempoMin: 45,
    estado: "Publicada",
    etiquetas: [
      { id: 1, nombre: "Almuerzo" },
      { id: 2, nombre: "Salado" },
    ],
    pasos: [
      { numero: 1, descripcion: "Condimentar las milanesas." },
      { numero: 2, descripcion: "Rebozarlas y freírlas hasta dorar." },
      { numero: 3, descripcion: "Preparar el puré y servir." },
    ],
    utensilios: [
      { id: 1, nombre: "Sartén" },
      { id: 2, nombre: "Olla" },
    ],
    ingredientes: [
      {
        cantidad: 4,
        unidadMedida: "unidades",
        ingrediente: { id: 1, nombre: "Milanesa de carne" },
      },
      {
        cantidad: 1,
        unidadMedida: "kg",
        ingrediente: { id: 2, nombre: "Papas" },
      },
    ],
  },
  {
    id: 2,
    nombre: "Ensalada Caesar",
    dificultad: "Fácil",
    tiempoMin: 20,
    estado: "Publicada",
    etiquetas: [
      { id: 3, nombre: "Ensalada" },
      { id: 4, nombre: "Cena" },
    ],
    pasos: [
      { numero: 1, descripcion: "Lavar y cortar la lechuga." },
      { numero: 2, descripcion: "Preparar el aderezo." },
      { numero: 3, descripcion: "Mezclar y agregar croutons." },
    ],
    utensilios: [
      { id: 3, nombre: "Ensaladera" },
      { id: 4, nombre: "Cuchillo" },
    ],
    ingredientes: [
      {
        cantidad: 1,
        unidadMedida: "unidad",
        ingrediente: { id: 3, nombre: "Lechuga" },
      },
      {
        cantidad: 100,
        unidadMedida: "g",
        ingrediente: { id: 4, nombre: "Queso parmesano" },
      },
    ],
  },
  {
    id: 3,
    nombre: "Tortilla de papa",
    dificultad: "Fácil",
    tiempoMin: 35,
    estado: "Borrador",
    etiquetas: [{ id: 5, nombre: "Vegetariana" }],
    pasos: [
      { numero: 1, descripcion: "Cortar y cocinar las papas." },
      { numero: 2, descripcion: "Batir los huevos." },
      { numero: 3, descripcion: "Mezclar y cocinar en sartén." },
    ],
    utensilios: [
      { id: 1, nombre: "Sartén" },
      { id: 5, nombre: "Espátula" },
    ],
    ingredientes: [
      {
        cantidad: 4,
        unidadMedida: "unidades",
        ingrediente: { id: 5, nombre: "Huevo" },
      },
      {
        cantidad: 500,
        unidadMedida: "g",
        ingrediente: { id: 2, nombre: "Papas" },
      },
    ],
  },
];