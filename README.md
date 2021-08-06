
# API REST DE EVENTOS

## LINK HEROKU

https://events-api-backend2021.herokuapp.com/

## API endpoints

`GET /api/events`

Retorna todos los eventos ordenados por fecha.

---

`GET /api/events/:id`

Retorna todos los detalles del evento con la id correspondiente.

---

`GET /api/events-share/:id`

Devuelve un mensaje con informacion del evento correspondiente, para compartir en Twitter.

---

`GET /api/events/outstanding`

Retorna todos los eventos destacados, tiene dos parametros opcinales (`limit` y `skip`)

Ejemplos 
`/api/events/outstanding`
`/api/events/outstanding?limit=10`
`/api/events/outstanding?skip=2`
`/api/events/outstanding?limit=10&skip=1`

---

`GET /api/events-login`

Retorna todos los eventos del usuario logueado, tiene dos parametros opcinales (`limit` y `skip`)

Ejemplos 
`/api/events-login`
`/api/events-login?limit=10`
`/api/events-login?skip=2`
`/api/events-login?limit=10&skip=1`

---

`POST /api/events-login`

Crea un evento con los siguientes campos:
title,
description,
dates,
place,
image,
y los asocia a el usuario logueado.

---

`POST /api/login`
 
Comprueba que el usuario exista y genera un token para mantener la sesion abierta.

---

`GET /api/users`
 
Retorna todos los usuarios.

---

`POST /api/users`
 
Crea un usuario con los siguientes campos:
username,
name,
password
