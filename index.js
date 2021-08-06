require('dotenv').config();
require('./mongo');

const express = require('express');
const routesEvents = require('./routes/eventsRoutes');
const routesUsers = require('./routes/usersRoutes');
const routesLogin = require('./routes/loginRouters');
const routesFront = require('./routes/frontRouters');
const app = express();
const cors = require('cors');

const notFound = require('./middleware/notFound.js');
const handleErrors = require('./middleware/handleErrors');


app.use(cors());
app.use(express.json());


// app.get('/', (request, response) => {
//     response.send('<h1>Hello Word</h1>')
// })

app.use('/',routesFront());

app.use('/api/',routesEvents());

app.use('/api/',routesUsers());

app.use('/api/',routesLogin());

app.use(notFound);
app.use(handleErrors);


const PORT = process.env.PORT

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
})


module.exports = {app, server}