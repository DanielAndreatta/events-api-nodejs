const express = require('express');
const router = express.Router();


// const {body} = require('express-validator');

const usersController = require('../controllers/usersController');


module.exports = function(){

    router.get('/users' , usersController.getAllUsers);

    router.post('/users' , usersController.createUser);

    return router;
}

