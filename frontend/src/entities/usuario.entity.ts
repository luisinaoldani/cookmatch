import { baseEntity } from "./baseEntity";

export class Usuario extends baseEntity {
  nombre!: string;
  apellido!: string;
  email!: string;
  rol!: string;
  
}