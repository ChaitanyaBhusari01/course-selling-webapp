const express = require('express');
const JWT = require('jsonwebtoken');
const userRouter = express.Router();
const { userauth } = require('../middlewares/userauth');
const {JWT_USER_SECRET} = require('../config');

const {userModel, purchaseModel} = require('../db');

userRouter.post('/signup',async function (req,res){
    const {email , password,first_Name , last_Name } =req.body;
    const user = await userModel.findOne({
        email  : email,
        password : password,
    });
    if(user) res.send("user is already signedup u can login now");
    else{
        try{
            await userModel.create({
                email : email,
                password : password,
                first_Name : first_Name,
                last_Name : last_Name
            });
            res.status(200).json({
            message : "user is now signed up",
            })
        }
        catch(error){
            res.status(500).json("there is problem in server to signup");
        }   
    }
});

userRouter.post('/login',async function (req,res){
    const {email,password} = req.body;
    const user = await userModel.findOne({
        email  : email,
        password : password,
    });
    if(!user){
        res.status(400).json({
        message : "invalid credentials"
        })
    }
    else{
        const token = JWT.sign({
            email:user.email,
            userId : user._id,
        },JWT_USER_SECRET);
        console.log(`your token is ${token}`);
        res.json({
            token : token,
        })
    }
});

userRouter.post('/purchases',userauth,async function (req,res){
    const userId = req.user.userId;
    try{
        const usercourses = await purchaseModel.find({userId : userId});
        if(!usercourses || usercourses.length===0) res.status(404).json({message : "there are no courses purchased by the user"});
        res.status(200).json({user});
    }
    catch(error){
        console.log("Error fetching the purchased courses by the user");
        res.status(500).json({message : "server had an error fetching the purchased courses"});
    }
});

module.exports = {
    userRouter : userRouter,
}