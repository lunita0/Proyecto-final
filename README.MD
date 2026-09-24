# IncidentHub API

## Descripción y Problema Solucionado

Este proyecto soluciona la gestión desorganizada de incidentes tecnológicos en una organización, como equipos dañados, fallas de red o problemas con impresoras, reemplazando los reportes informales por una API REST estructurada y profesional.

## Tecnologías

* **Node.js**
* **Express**
* **TypeScript**
* Persistencia en memoria mediante arreglos de TypeScript.
* Sin bases de datos relacionales ni ORMs.

## Instalación y Ejecución

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar el servidor en modo desarrollo

```bash
npm run dev
```

El servidor se ejecutará en:

```text
http://localhost:3000
```

### 3. Compilar el proyecto

```bash
npm run build
```

Este comando compila el código TypeScript a JavaScript dentro de la carpeta `dist/`.

### 4. Ejecutar la versión compilada

```bash
npm start
```

## Sistema de Autenticación

El proyecto no implementa JWT. Utiliza un sistema de tokens fijos enviados mediante el encabezado:

```text
Authorization: Bearer <token>
```

### Tokens disponibles

* **`instructor-token`**: Rol de administrador, con permisos totales, incluyendo eliminaciones.
* **`technician-token`**: Rol de técnico, con permisos para listar, crear, modificar y cambiar estados, pero sin permisos para eliminar.

## Endpoints de la API

| Método | Ruta                        | Control de Acceso | Descripción                                                                 |
| ------ | --------------------------- | ----------------- | --------------------------------------------------------------------------- |
| GET    | `/api/incidents`            | Público           | Consulta el listado completo de incidentes.                                 |
| GET    | `/api/incidents/critical`   | Público           | Retorna únicamente los incidentes de prioridad crítica.                     |
| GET    | `/api/incidents/pending`    | Público           | Filtra los incidentes abiertos o en proceso.                                |
| GET    | `/api/incidents/stats`      | Público           | Retorna estadísticas operacionales calculadas dinámicamente.                |
| GET    | `/api/incidents/:id`        | Público           | Busca un incidente específico por su ID.                                    |
| POST   | `/api/incidents`            | Requiere Token    | Registra un nuevo incidente y genera automáticamente su ID, estado y fecha. |
| PUT    | `/api/incidents/:id`        | Requiere Token    | Actualiza los datos de un incidente existente.                              |
| PATCH  | `/api/incidents/:id/status` | Requiere Token    | Modifica el estado del incidente validando las transiciones permitidas.     |
| DELETE | `/api/incidents/:id`        | Admin Token       | Elimina lógicamente un incidente del sistema.                               |

## Capa de Middlewares

Los middlewares permiten interceptar y procesar las peticiones antes de que lleguen a los controladores.

### Logger

Imprime en consola un registro con la marca de tiempo, método HTTP y ruta de cada petición entrante.

### Request Info

Añade metadatos personalizados (`req.requestInfo`) para enriquecer la petición con información relacionada con el momento de la solicitud.

### Auth

Verifica la autenticidad del token Bearer enviado en los headers. Si el token no es válido, deniega el acceso mediante una respuesta `401`.

### Admin

Evalúa si el usuario autenticado posee privilegios de administrador. Los intentos de los técnicos de realizar operaciones administrativas reciben una respuesta `403`.

### Validate ID

Comprueba que el parámetro `:id` recibido en la URL sea estrictamente un número entero positivo.

### Validate Incident / Priority / Time

Asegura que la información del body cumpla con los tipos, catálogos permitidos y rangos de tiempo lógicos.

Las prioridades permitidas son:

* `LOW`
* `MEDIUM`
* `HIGH`
* `CRITICAL`

Además, los incidentes críticos tienen una duración máxima de 60 minutos.

### Not Found (404)

Captura cualquier ruta inexistente en el sistema.

### Error Middleware

Centraliza la gestión de excepciones y transforma los errores controlados (`AppError`) en una respuesta JSON limpia y uniforme.

## Model vs DTO

### Model — `Incident`

Define la estructura completa y definitiva con la que opera la aplicación internamente.

Incluye campos gestionados automáticamente por el servidor, como:

* `id`
* `createdAt`
* `status`

### DTO — `CreateIncidentDto`

Representa un contrato de datos de entrada específico.

Limita estrictamente lo que el cliente puede enviar al servidor. Por ejemplo, al crear un incidente, el cliente no introduce el `id`, la fecha ni el estado, ya que el backend se encarga de generarlos.

## Reflexión Final

### ¿Qué ventajas ofrece implementar validaciones, autenticación y manejo de errores mediante middlewares?

Centralizar estas validaciones y capas de seguridad en middlewares libera a los controladores de responsabilidades repetitivas y código redundante, gracias a esto, los controladores se dedican principalmente a coordinar la lógica de negocio, mientras que los middlewares actúan como filtros independientes que garantizan la integridad de los datos, la seguridad de las rutas y un manejo uniforme de los errores, esta organización permite mantener el código limpio, reutilizable, mantenible y fácil de escalar.

---

## Proyecto

**IncidentHub API**

API REST desarrollada con **Node.js, Express y TypeScript**.
