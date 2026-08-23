import { Paso } from "../../entities/paso.entity";

export const PasoMock: Record<number, Paso[]> = {
  1: [
    { numero: 1,
      descripcion: "Condimentar las milanesas con sal y pimienta.",
    },
    { numero: 2,
      descripcion: "Pasarlas por huevo y pan rallado.",
    },
    { numero: 3,
      descripcion: "Freír hasta que estén doradas.",
    },
  ],

  2: [
    { numero: 1,
      descripcion: "Lavar y cortar la lechuga.",
    },
    { numero: 2,
      descripcion: "Preparar el aderezo Caesar.",
    },
    { numero: 3,
      descripcion: "Mezclar los ingredientes y servir.",
    },
  ],

  3: [
    { numero: 1,
      descripcion: "Pelar y cortar las papas.",
    },
    { numero: 2,
      descripcion: "Cocinar las papas en una sartén.",
    },
    { numero: 3,
      descripcion: "Agregar los huevos batidos y cocinar la tortilla.",
    },
  ],
};