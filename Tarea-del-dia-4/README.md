# **Maqueta de Endpoints REST** ⚙️
---

## ***Recursos REST necesarios para el Blog***

### *Formato: Recurso → Descripción*

- /login → Iniciar Sesión
- /signup → Registro
- /posts → Lista de publicaciones
- /posts/:id → Ver, editar, eliminar un post
- /users/:id/posts → Posts de un usuario

---

## ***Definición de Endpoints***

### Endpoints de Autenticación 🔐

- *POST /login*

📥 → Entrada: 
```json
{ "email": "abraham@example.com", "password": "1234" }
```
📤 → Respuesta:
```json
{
  "token": "abc123",
  "user": {
    "id": 1,
    "name": "Abraham"
  }
}
```
- *POST /signup*

📥 → Entrada:
```json
{
  "name": "Abraham",
  "email": "abraham@example.com",
  "password": "1234"
}
```
📤 → Respuesta:
```json
{
  "id": 1,
  "name": "Abraham",
  "email": "abraham@example.com"
}
```
### Endpoints para Publicaciones (Posts) 📝 

- *GET /posts*

📥 → Entrada: **Ninguna (excepto token si es privado)**

📤 → Respuesta:
```json
[
  { "id": 1, "title": "Breaking Bad", "content": "¡La mejor serie!" },
  { "id": 2, "title": "Game of Thrones", "content": "¡El mejor plottwist de una serie!" }
  { "id": 3, "title": "Memento", "content": "Mi película favorita de Nolan" }
  { "id": 4, "title": "Piratas en el Callao", "content": "La peor película que he visto" }
]
```
- *GET /posts/:id*

📥 → Entrada: **ID del post en la URL** *(p.ej. GET /posts/3)*

📤 → Respuesta:
```json
{
  "id": 3,
  "title": "Memento",
  "content": "Mi película favorita de Nolan"
}
```
- *POST /posts*

📥 → Entrada: 
```json
{
  "title": "Nuevo post: Proyecto DEVF en Proceso",
  "content": "No sé usar Postman"
}
```

📤 → Respuesta:
```json
{
  "id": 5,
  "title": "Nuevo post: Proyecto DEVF en Proceso",
  "content": "No sé usar Postman"
}
```
- *PUT /posts/:id*

📥 → Entrada: *(p.ej. para PUT /posts/5)*
```json
{
  "title": "Título actualizado: Proyecto DEVF Completo",
  "content": "Contenido actualizado: ¡Ya sé usar Postman!"
}
```

📤 → Respuesta:
```json
{
  "id": 5,
  "title": "Título actualizado: Proyecto DEVF Completo",
  "content": "Contenido actualizado: ¡Ya sé usar Postman!"
}
```
- *DELETE /posts/:id*

📥 → Entrada: **ID del post en la URL** *(p.ej. DELETE /posts/4)*

📤 → Respuesta:
```json
{ "message": "Post eliminado con éxito" }
```
### Endpoint para traer Posts de un Usuario 👤 

- *GET /users/:id/posts*

📥 → Entrada: **Ninguna** *(p.ej. para GET /users/1/posts)*

📤 → Respuesta:
```json
[
  { 
    "id": 1, 
    "userId": 1,
    "title": "Breaking Bad", 
    "content": "¡La mejor serie!" 
  },
  { 
    "id": 2,
    "userId": 1, 
    "title": "Game of Thrones", 
    "content": "¡El mejor plottwist de una serie!" 
  },
  {
    "id": 3,
    "userId": 1,
    "title": "Memento",
    "content": "Mi película favorita de Nolan"
  },
  {
    "id": 5,
    "userId": 1,
    "title": "Título actualizado: Proyecto DEVF Completo",
    "content": "Contenido actualizado: ¡Ya sé usar Postman!"
  }
]
```