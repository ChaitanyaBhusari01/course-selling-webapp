const mongoose = require ('mongoose');
const {Types} = mongoose; 
const{mongodburl} = require('./config');

mongoose.connect(mongodburl)
.then(()=>{
    console.log("connected to mongodb");
})
.catch((err)=>{
    console.log("error in connnecting mondodb");
});



const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : String,
    password : String,
    first_Name : String,
    last_Name : String,
});
const adminSchema = new Schema({
    email : String,
    password : String,
    first_Name : String,
    last_Name : String,
});
const courseSchema = new Schema({
    title : String,
    description : String,
    price : Number,
    imageUrl : String,
    creatorId : Types.ObjectId,
});
const purchaseSchema = new Schema({
    userId : Types.ObjectId,
    CourseId : Types.ObjectId,

});

const userModel = mongoose.model('user',userSchema);
const adminModel = mongoose.model('admin',adminSchema);
const courseModel = mongoose.model('courses',courseSchema);
const purchaseModel = mongoose.model('purchases',purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel,
}

