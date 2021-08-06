const express = require('express');
const router = express.Router();
const userExtractor = require('../middleware/userExtractor');


// const {body} = require('express-validator');

const eventsController = require('../controllers/eventsController');


module.exports = function(){

    // login

    router.get('/events-login', userExtractor , eventsController.showEventsPaged);
    
    router.post('/events-login', userExtractor , eventsController.createEvent);

    // no login

    router.get('/events/outstanding', eventsController.showEventsOutstanding);
    
    router.get('/events',eventsController.showAllEvents);

    router.get('/events-share/:id', eventsController.shareEvent);

    router.get('/events/:id', eventsController.showEventById);

    

    

    return router;
}