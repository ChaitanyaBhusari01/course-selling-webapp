
const JWT = require('jsonwebtoken');
const {JWT_ADMIN_SECRET} = require('../config');

const adminauth=(req,res,next)=>{
    console.log("we reached authentication middleware");
    const token = req.headers.authorization;
    if(!token) return res.status(400).json({message : "token is absent in he headers"});
    try{
        
        const admin  = JWT.verify(token,JWT_ADMIN_SECRET);
        console.log("admin is verified");
        req.admin = admin;
        next();
    }
    catch(error){
        return res.status(400).json({message : "you are not logged in"});
    }

}
module.exports={
    adminauth, 
};