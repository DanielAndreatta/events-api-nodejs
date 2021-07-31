const Event = require('../models/Event')

// let events = {

//     title: "E",
//     description: ,
//     dates: [] ,
//     place: ,
//     outstanding: ,
//     image: ,
// }


// muestra todos los eventos
exports.showAllEvents = async (request, response, next) => {
    
    try {
        
        const events = await Event.find({})
        response.json(events)

    } catch (error) {
        next(error);
    }
    
};

// crear un evento
exports.createEvent = async(request,response,next) => {

    const {title, description, dates, place, image} = request.body;

    if(!title || !description || !dates || !place || !image ){
        return response.status(400).json({
            error: 'a required field is missing'
        });
    }

    const newEvent = new Event({

        title,
        description,
        dates,
        place,
        outstanding : "no",
        image
    });

    try {
        
        const savedEvent = await newEvent.save();
        response.status(201).json(savedEvent);

    } catch (error) {
        next(error);
    }
    
};