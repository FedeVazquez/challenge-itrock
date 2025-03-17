#  API de Gestión de Tareas

## Como usarlo
1.  Clonar el repositorio haciendo  `https://github.com/FedeVazquez/challenge-itrock.git`
2.  Abrir el proyecto en su editor de código
3.  Teniendo abierto Docker Desktop ejecutar  `docker-compose up --build`

## Requiere:
-   **NODE**: Se debe instalar NODE en el sistema operativo
-   **DOCKER**: Para poder levantar la imágen de Mongo en el contenedor

## Endpoints a disparar en postman:
**POST**: `http://localhost:4000/auth/login` **se debe agregar un body json como este:**
`{
"username":  "admin",
"password":  "password"
}`

**GET**: `http://localhost:4000/tasks/` **se debe agregar el token generado en authorization**

**GET /tasks/:id**: `http://localhost:4000/tasks/idDeLaTarea` **se debe agregar el token generado en authorization y ademas el id de la tarea a buscar**

**POST**: `http://localhost:4000/tasks/` **Para crear una tarea se debe agregar un body json como este:** `{"title":  "nombre de la tarea"}`

**GET /tasks/populate:**: `http://localhost:4000/tasks/populate`**Para llamar a la lista externa de tareas** en el headers agregar `Key: x-api-key, Value: supersecreta`


