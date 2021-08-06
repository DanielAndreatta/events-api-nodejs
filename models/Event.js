const {model, Schema} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const eventSchema = new Schema({

    title: {
        type: String,
        unique: true,
        required: [true, 'title is required!']
    },
    description: {
        type: String,
        required: [true, 'description is required!']
    },
    dates: {
        type: [Date],
        required: [true, 'dates is required!']
    },
    place: {
        type: String,
        required: [true, 'place is required!']
    },
    outstanding: {
        type: Number,
        required: [true, 'outstanding is required!']
    },
    image: {
        type: String,
        required: [true, 'image is required!']
    }
    ,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

eventSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

eventSchema.plugin(uniqueValidator)

const Event = model('Event',eventSchema);

module.exports = Event;