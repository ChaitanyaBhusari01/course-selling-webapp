const express = require('express');
const courseRouter= express.Router();
const {courseModel} = require('../db');
courseRouter.get('/purchase',function (req,res){

});

courseRouter.get('/preview',function (req,res){

});

module.exports = {
    courseRouter : courseRouter,
};
