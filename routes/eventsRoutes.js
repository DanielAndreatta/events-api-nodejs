const express = require('express');
const router = express.Router();
const userExtractor = require('../middleware/userExtractor');


// const {body} = require('express-validator');

const eventsController = require('../controllers/eventsController');


module.exports = function(){

    // login
    // router.get('/events', userExtractor , eventsController.showEventsPaged);
    
    // , userExtractor
    router.post('/events' , eventsController.createEvent);

    // no login
    router.get('/', (request, response) => {
        response.send('<h1>Hello Word</h1>')
    })
    
    router.get('/events',eventsController.showAllEvents);
    

    // router.get('/events/share', eventsController.shareEvent);

    // router.get('/events/outstanding', eventsController.showEventsOutstanding);

    // router.get('/events/:id', eventsController.showEventById);

    return router;
}