const express = require('express');
const router = express.Router();



module.exports = function(){


    router.get('/', (request, response) => {
        response.send('<h1>Trabajo final del curso de NodeJS</h1>')
    })

    return router;
}