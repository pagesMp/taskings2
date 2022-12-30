POST /auth/register

BODY -> name, email, password

POST /auth/login

BODY -> email, password

Tasks
POST /tasks/create

BODY -> title, description

PUT /tasks/update/:id

BODY -> title, description

PARAMS {id} -> identificador de tarea

GET /tasks/get/:id

PARAMS {id} -> identificador de tarea

GET /tasks/get/all

DELETE /tasks/delete/:id

PARAMS {id} -> identificador de tarea