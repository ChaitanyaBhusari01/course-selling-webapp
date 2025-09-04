const JWT = require('jsonwebtoken');
const {JWT_USER_SECRET} = require('../config');

const userauth = async(req,res,next) =>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({message : "user is not logged or token is missing from the headers"});
    }
    else{
        try{
            const user = JWT.verify(token,JWT_USER_SECRET);
            req.user = user;
            next();
        }
        catch(error){
            return res.json({message : "token is absent or expired"});
        }
        
    }

}

module.exports = {
    userauth,
};