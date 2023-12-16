const  express = require("express");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();
const TEACHERS = require("../mock/teachers");
const STUDENTS = require("../mock/student");
const teachers = require("../mock/teachers");

authRouter.post("/login", (req,res) => {
    const {name ,age } = req.body;
    const foundTeacher = TEACHERS.find(
        (user) => user.name === name && user.age === age 
    );
    if(foundTeacher){
        const user = {name: name, type: "teacher"};
        const token = jwt.sign(user, "WEB73-HOMEWORK");
        res.json({user : user,token: token})
        return;
    }    
    const foundStudent = STUDENTS.find(
        (user) => user.name === name && user.age === age 
    );
    if(foundStudent){
        const user = {name: name, type: "student"};
        const token = jwt.sign(user, "WEB73-HOMEWORK");
        res.json({user : user,token: token})
        return;
    } 
    res.json({
        message: "Wrong name Or Age!!",
    });
});

module.exports = authRouter;