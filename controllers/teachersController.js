const { ObjectId } = require("mongodb");

const { db } = require("../utils/connectToDB");

const getTeachers = async (req, res) => {
    const teachers = await db.teachers.find().toArray();
    res.status(200).json({
        message: "Get All Teachers Successfully!!",
        data: teachers,
    });
};

const getTeacherById = async (req,res) => {
    const id = req.params.id;
    const teacher = await db.teachers.findOne({
        _id: new ObjectId(id),
    });
    res.status(200).json({
        message: "Get Teacher With Id Successfully!!",
        data: teacher,
    });
};

const createTeacher = async (req, res) =>{
    const {name, age} = req.body;
    const newTeacher = {
        name: name,
        age: age,
        type: "teacher",
    };
    const teacher = await db.teachers.insertOne(newTeacher);
    res.status(201).json({
        message: "Create Successfully!!",
        data: newTeacher,
    });
}

const updateTeacher = async (req,res) =>{
    const id = req.params.id;
    const {name, age, type} = req.body;
    await db.teachers.updateOne({
        _id: new ObjectId(id),
    },
    {
        $set:{
            name: name,
            age: age,
            type: type,
        }
    });
    res.status(200).json({
        message: "Update Successfully!!",
        data: {...req.body, _id: id},
    });
};

const deleteTeacher = async (req,res)=>{
    const id = req.params.id;
    await db.teachers.deleteOne({
        _id: new ObjectId(id),
    });
    res.status(200).json({
        message: "Delete Successfully!!",
    });
};

module.exports = {getTeachers,getTeacherById,createTeacher,updateTeacher,deleteTeacher,}