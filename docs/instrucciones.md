# Instrucciones de instalación

## Requisitos

Antes de ejecutar el proyecto, instalar:

- Node.js 24 o compatible.
- pnpm 11.
- MySQL 8 o compatible.
- Git.

## 1. Clonación del proyecto

Clonar el repositorio desde GitHub:

```bash
git clone https://github.com/luisinaoldani/cookmatch.git
```

Ingresar a la carpeta del proyecto:

```bash
cd cookmatch
```

## 2. Configurar la base de datos

Crear una base de datos MySQL llamada `cookmatch`.

Luego, configurar las credenciales de conexión en:

```text
backend/.env
```

El archivo debe contener:

```env
PORT=3000
DB_HOST=localhost
DB_USER=TU_USUARIO
DB_PASSWORD=TU_CONTRASEÑA
DB_NAME=cookmatch
```

Reemplazar `TU_USUARIO` y `TU_CONTRASEÑA` por las credenciales correspondientes de MySQL.

## 3. Configurar y ejecutar el backend

Abrir una terminal en la carpeta `backend`:

```bash
cd backend
```

Instalar las dependencias:

```bash
pnpm install
```

Crear las tablas de la base de datos mediante las migraciones:

```bash
pnpm orm migration:up
```

Iniciar el servidor:

```bash
pnpm dev
```

El backend quedará disponible en:

```text
http://localhost:3000
```

Mantener esta terminal abierta mientras se utiliza la aplicación.

## 4. Configurar y ejecutar el frontend

Abrir una segunda terminal y ubicarse en la carpeta `frontend`:

```bash
cd frontend
```

Instalar las dependencias:

```bash
pnpm install
```

Verificar que el archivo `frontend/.env` contenga:

```env
VITE_API_URL=http://localhost:3000/api
```

Iniciar la aplicación:

```bash
pnpm dev
```

La terminal mostrará la dirección en la que se ejecuta el frontend, normalmente:

```text
http://localhost:5173
```

Abrir esa dirección en un navegador para utilizar CookMatch.

## 5. Actualizar el proyecto

Si el proyecto ya fue clonado anteriormente y se desea obtener los últimos cambios del repositorio:

```bash
git pull
```

Luego, si hubo cambios en las dependencias, actualizar las mismas ejecutando:

```bash
pnpm install
```

Si se agregaron nuevas migraciones de base de datos, ejecutarlas desde `backend`:

```bash
pnpm orm migration:up
```

Finalmente, iniciar nuevamente el backend y frontend siguiendo los pasos anteriores.

## 6. Ejecución posterior

Una vez realizada la instalación inicial, no es necesario repetir la creación de la base de datos ni las migraciones que ya hayan sido ejecutadas.

Para volver a ejecutar el proyecto:

**Terminal 1 — Backend**

```bash
cd cookmatch/backend
pnpm dev
```

**Terminal 2 — Frontend**

```bash
cd cookmatch/frontend
pnpm dev
```

Luego acceder desde el navegador a la dirección indicada por el frontend.
