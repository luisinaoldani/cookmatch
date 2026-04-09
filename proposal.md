# CookMatch

## Propuesta TP DSW

## Grupo
### Integrantes
* 54432 - Baras, Candela
* 53999 - Oldani, Luisina María
* 53637 - Panto, Martina
* 52431 - Rodriguez, Martina

### Repositorios
* [frontend app](link)
* [backend app](link)

## Tema

### Descripción
CookMatch es una aplicación web que permite encontrar recetas en función de los ingredientes que tienen disponibles en su hogar. Se podrán cargar ingredientes y el sistema mostrará recetas compatibles. Además, será posible ver recetas ofrecidas por la aplicación eligiendo su características. Permitirá, también, guardar recetas favoritas y calificarlas con un puntaje. El sistema busca facilitar la planificación de comidas y reducir el desperdicio de alimentos, brindando sugerencias personalizadas.

### Modelo

## Alcance Funcional

### Alcance Mínimo

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple| 1. CRUD Receta<br>2. CRUD Ingrediente<br>3. CRUD Etiqueta<br>4. CRUD Utensilios|
|CRUD dependiente| 1. CRUD Puntuacion {depende de} CRUD Receta<br>2. CRUD Paso {depende de} CRUD Receta<br>3. CRUD Favorito {depende de} CRUD Receta|
|Listado<br>+<br>detalle| 1. Listado de recetas filtrado por los ingredientes disponibles => Detalle muestra información completa de la receta incluyendo ingredientes, pasos, utensilios y etiquetas <br>2. Listado de recetas filtrado por etiquetas => Detalle muestra información completa de la receta incluyendo ingredientes, pasos utensilios y etiquetas |
|CUU/Epic| 1. CUU Usuario busca receta a partir de ingredientes disponibles<br>2. CUU Usuario califica receta |


Adicionales para Aprobación:
|Req|Detalle|
|:-|:-|
|CRUD | 1. CRUD Usuario |
|CUU/Epic|  |
