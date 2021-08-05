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
        
        const events = await Event.find({}).sort({dates: 1});
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

        let flag = 0
        
        // verificar fecha a ingresar
        const newDate = new Date()
        dates.forEach(element => {
            if(new Date(element).getTime() < new Date(newDate).getTime())
                flag = 1     
        });

        if(flag === 1) 
            return response.status(400).json({
                error: 'date is not correct'
            })
        
        
        dates.sort()
        
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
// exports.createEvent = async(req,res,next) => {

//     const {title, description, dates, place, image} = req.body;
//     const {userId} = req;

//     const user = await User.findById(userId);

//     if(!title || !description || !dates || !place || !image){
//         return res.status(400).json({
//             error: 'Falta un campo obligatorio'
//         });
//     }

//     let flag = 0;

//     dates.forEach(date => {

//         if(!(new Date(date).getTime() > new Date().getTime())){
//             flag = 1;
//         }

//     });

//     if(flag === 1){
//         return res.status(400).json({
//             error: 'the date is not correct'
//         });
//     }

//     dateList.sort();


//     const newEvent = new Event({

//         title,
//         description,
//         dateList,
//         place,
//         outstanding: 'No',
//         image,
//         user: user._id
//     });

//     try {
//         const savedEvent = await newEvent.save();
//         user.events = user.events.concat(savedEvent._id);
//         await user.save();
//         res.status(201).json(savedEvent);
//     } catch (error) {
//         next(error);
//     }

// };

exports.showEventById = async(req,res,next) => {

    try {

        const {id} = req.params;
        const eventFound = await Event.findById(id);
        if(eventFound){
            return res.json(eventFound);
        }else{
            res.status(404).end();
        }

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


