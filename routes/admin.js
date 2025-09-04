const express = require('express');
const adminRouter = express.Router();
const {courseModel} = require('../db');
const {adminModel} = require('../db');
const  JWT  = require('jsonwebtoken');
const {adminauth} = require('../middlewares/adminauth');
const {JWT_ADMIN_SECRET} = require ('../config');

adminRouter.post('/signup',async function (req,res){
    const {email , password, first_Name , last_Name } =req.body;
    const admin = await adminModel.findOne({
        email  : email,
        password : password,
    });
    if(admin) res.send("admin is already signedup u can login now");
    else{
        await adminModel.create({
            email : email,
            password : password,
            first_Name : first_Name,
            last_Name : last_Name
        });
        res.status(200).json({
            message : "admin is now signed up",
        })
    }
});

adminRouter.post('/login',async function (req,res){
    const {email,password} = req.body;
    const admin = await adminModel.findOne({
        email  : email,
    });
    
    if(!admin || admin.password !== password){
        res.status(400).json({
        message : "invalid credentials"
        })
    }
    else{
        console.log("before admin.sign");
        const token = JWT.sign({
            email:admin.email,
            adminId : admin._id,
        },JWT_ADMIN_SECRET);
        console.log(`your token is ${token}`);
        res.status(200).json({
            token : token,
        })
    }
});

adminRouter.get('/bulk',adminauth,async function(req,res){
    const adminId = req.admin.adminId;
    try{
        const admincourses = await courseModel.find({creatorId : adminId}); 
        if(!admincourses || admincourses.length===0) {
            console.log("no courses found for admin");
            return res.status(404).json({message : "no courses found for this admin"});
        }          
        res.json({admincourses});
    } 
    catch(error){
        console.log("error fetching admin courses")
        return res.status(500).json({message : "server had an error fetching admin courses"});
    }
        
});

adminRouter.put('/course',adminauth,async function(req,res){
    const {title , description ,price,imageUrl,courseId} = req.body;
    const adminId = req.admin.adminId;
    try{
        const updatedcourse = await courseModel.updateOne({_id : courseId,creatorId : adminId},{
            title : title,
            description : description,
            price : price,
            imageUrl : imageUrl,
        })
        res.status(200).json({message : "course updated"});
    }
    catch(error){
        console.log("there was error updating a new course in the database");
        return res.status(500).json({message : "the server had problem while updating the course by the admin"});
    }
    
});

adminRouter.post('/course',adminauth,async function(req,res){
    const {title , description , price , imageUrl , creatorId} = req.body;
        const adminId= req.admin.adminId;
        try{
            const newcourse = await courseModel.create({
                title : title,
                description : description,
                price : price,
                imageUrl : imageUrl,
                creatorId : adminId,
            })
            res.status(200).json({message : "course created"});
        }
        catch(error){
            console.log("there was error pushinng a new course in the database");
            return res.status(500).json({message : "the server had problem while putting the course by the admin"});
        }
})

module.exports={
    adminRouter : adminRouter,
};