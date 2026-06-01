# CookMatch

## Propuesta TP DSW

## Grupo
### Integrantes
* 54432 - Baras, Candela
* 53999 - Oldani, Luisina María
* 53673 - Panto, Martina
* 52431 - Rodriguez, Martina

### Repositorios
* [frontend app](link)
* [backend app](link)

## Tema

### Descripción
CookMatch es una aplicación web que permite encontrar recetas en función de los ingredientes que tienen disponibles en su hogar. Se podrán cargar ingredientes y el sistema mostrará recetas compatibles. Además, será posible ver recetas ofrecidas por la aplicación eligiendo su características. Permitirá, también, calificar las recetas con un puntaje. El sistema busca facilitar la planificación de comidas y reducir el desperdicio de alimentos, brindando sugerencias personalizadas.

### Modelo
[MD CookMatch](https://drive.google.com/file/d/1wPC4YyZB8ayWdqHaVrbGGERGvp1hEzty/view?usp=sharing)

## Alcance Funcional

### Alcance Mínimo

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple| 1. CRUD Ingrediente<br>2. CRUD Utensilio<br>3. CRUD Etiqueta<br>4. CRUD Tipo_restriccion |
|CRUD dependiente| 1. CRUD Receta {depende de} CRUD Ingrediente, CRUD Utensilio y CRUD Etiqueta<br>2. CRUD Receta_Ingrediente {depende de} CRUD Receta y CRUD Ingrediente<br>3. CRUD Paso {depende de} CRUD Receta<br>4. CRUD Restriccion_alimentaria {depende de} CRUD Tipo_Restriccion |
|Listado<br>+<br>detalle| 1. Listado de recetas según ingredientes ingresados => Detalle muestra información completa de las  receta incluyendo ingredientes, pasos utensilios y etiquetas<br>2. Listado de restricciones alimentarias filtrado por tipo de restricción => Detalle muestra información completa de las restricciones<br>3. Listado de recetas filtrado por etiquetas => Detalle muestra información completa de la receta incluyendo ingredientes, pasos utensilios y etiquetas |
|CUU/Epic| 1. CUU Usuario crea una receta<br>2. CUU Usuario crea planificacion de comidas para su semana |


Adicionales para Aprobación:
|Req|Detalle|
|:-|:-|
| CRUD | 1. CRUD Receta<br>2. CRUD Ingrediente<br>3. CRUD Receta_ingrediente<br>4. CRUD Utensilio<br>5. CRUD Etiqueta<br>6. CRUD Paso<br>7. CRUD Tipo_restriccion<br>8. CRUD Restriccion_alimentaria<br>9. CRUD Usuario<br>10. CRUD Puntaje |
|CUU/Epic| 1. CUU Usuario califica receta<br>2. CUU Usuario reporta una receta duplicada<br>3. Epic Moderador elimina recetas duplicadas<br>4. Epic Sistema ordena recetas según su calificación |
