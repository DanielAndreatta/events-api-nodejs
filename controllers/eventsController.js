const Event = require('../models/Event')
const User = require('../models/User')

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


exports.showEventById = async(request ,response ,next) => {

    try {

        const {id} = request.params;
        const eventFound = await Event.findById(id);
        if(eventFound){
            return response.json(eventFound);
        }else{
            response.status(404).end();
        }

    } catch (error) {
        next(error);
    }

};


exports.showEventsPaged = async (request, response, next) => {
  
    try {
        const { limit = 10, skip = 0 } = request.query;
        const {userId} = request;
    
        const [total, events] = await Promise.all([
            Event.countDocuments(),
            Event.find({user : userId}).sort({ _id: -1 }).skip(Number(skip)).limit(Number(limit))
        ]);
    
        return response.json({ total, events });

    } catch (error) {
        next(error)
    }

};


// crear un evento
exports.createEvent = async(request,response,next) => {

    const {title, description, dates, place, image} = request.body;
    const {userId} = request;

    try {

        const user = await User.findById(userId);

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
            image,
            user: user._id 
        });

        const savedEvent = await newEvent.save();
        user.events = user.events.concat(savedEvent._id);
        await user.save();
        response.status(201).json(savedEvent);

    } catch (error) {
        next(error);
    }
    
};

exports.shareEvent = async(request,response,next) => {

    try {

        const {id} = request.params;
        const {_id,title,dates} = await Event.findById(id);
        const url = `http://${request.headers.host}/api/events/${_id}`;
        const message = {
            message : `Iré al ${title} @ ${dates[0]} ${url}`
        };
        response.json(message);

    } catch (error) {
        next(error);
    }

}


