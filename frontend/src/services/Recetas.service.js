const API_URL = 'http://localhost:3000/api/recetas';

export async function obtenerRecetas() {
  const respuesta = await fetch(API_URL);
  if (!respuesta.ok) {
    throw new Error('Error al conectar con la API');
  }
  return await respuesta.json();
}