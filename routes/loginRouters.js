const express = require('express');
const router = express.Router();


// const {body} = require('express-validator');

const loginController = require('../controllers/loginController');


module.exports = function(){


    router.post('/login', loginController.createLogin);

    return router;
}