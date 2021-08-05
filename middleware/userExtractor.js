const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const authorization = req.get('authorization');
    let token = '';

    if(authorization && authorization.toLowerCase().startsWith(process.env.SECRET2)){
        token = authorization.substring(7);
    }

    
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if(!token || !decodedToken.id){
        return res.status(401).json({error: 'token faltante o inválido'});
    }

    const {id: userId} = decodedToken;

    req.userId = userId;

    next();
}