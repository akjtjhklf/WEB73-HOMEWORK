const jwt = require("jsonwebtoken");

const { db } = require("../utils/connectToDB");

const login = async (req,res) => {
    const {name ,age } = req.body;
    const foundTeacher = db.teachers.findOne({
        name: name,
        age: age,
    });
    if(foundTeacher){
        const user = {name: name, type: "teacher"};
        const token = jwt.sign(user, "WEB73-HOMEWORK");
        res.json({user : user,token: token})
        return;
    }    
    const foundStudent = db.students.findOne({
        name: name,
        age: age,
    });
    if(foundStudent){
        const user = {name: name, type: "student"};
        const token = jwt.sign(user, "WEB73-HOMEWORK");
        res.json({user : user,token: token})
        return;
    } 
    res.json({
        message: "Wrong name Or Age!!",
    });
};

module.exports = { login, };