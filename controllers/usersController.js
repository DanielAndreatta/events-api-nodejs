const bcrypt = require('bcrypt')
const User = require('../models/User')



// usersRouter.get
exports.getAllUsers =  async (request, response, next) => {
    
    try {
        const users = await User.find({}).populate('events', {
            title: 1
        })
    
        response.json(users)
    } catch (error) {
        next(error)
    }
}


//usersRouter.post
exports.createUser = async (request, response) => {
    try {
        const {body} = request
        const {username, name, password} = body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        
        const user = new User({
            username,
            name,
            passwordHash
        })

        const savedUser = await user.save()
        
        response.status(201).json(savedUser) 

    } catch (error) {
        response.status(400).json(error)
    }     
}

