const express = require("express");

const teacherRouter = express.Router();

const TEACHERS = require("../mock/teachers");
const requireAPIKey = require("../middleware/requireAPIKey");
const logRequestMethod = require("../middleware/logRequestMethod");
const teachers = require("../mock/teachers");

teacherRouter.use(requireAPIKey);
teacherRouter.use("/:id", logRequestMethod);


teacherRouter.get("/", (req, res) => {
    res.json(TEACHERS);
})

teacherRouter.get("/:id", (req, res) => {

    const foundTeacher = TEACHERS.find((teacher) => teacher.id === parseInt(req.params.id));

    if (foundTeacher) {
        res.json(foundTeacher);
    } else {
        res.status(404).json({ message: "Teacher not found" });
    }
})

teacherRouter.get('/', (req, res) => {
    const fromAge = parseInt(req.query.from, 10);
    const toAge = parseInt(req.query.to, 10);

    // Kiểm tra xem query parameters có tồn tại và là số không
    if (isNaN(fromAge) || isNaN(toAge)) {
        return res.status(400).json({ error: 'Invalid age parameters' });
    }

    // Lọc giáo viên theo độ tuổi
    const filteredTeachers = TEACHERS.filter(
        (teacher) => teacher.age >= fromAge && teacher.age <= toAge
    );

    // Trả về danh sách giáo viên theo độ tuổi
    res.json(filteredTeachers);
});

teacherRouter.post("/", (req, res) => {
    const newteacher = {
        id: TEACHERS.length + 1,
        ...req.body,
    };
    TEACHERS.push(newteacher);
    res.json(newteacher);
});

teacherRouter.put("/:id", (req,res)=>{
    const teacherIndex = TEACHERS.findIndex(
        (teacher) => teacher.id == req.params.id
    );
    if(teacherIndex === -1){
        res.send("Not found teacher");
    } else{
        const updatedTeacher = {...TEACHERS[teacherIndex], ...req.body};
        TEACHERS[teacherIndex] = updatedTeacher;
        res.json(updatedTeacher);
    }   
});

teacherRouter.delete("/:id", (req,res) => {
    const teacherIndex = TEACHERS.findIndex(
        (teacher) => teacher.id == req.params.id
    );
    if(teacherIndex === -1){
        res.send("Not found teacher");
    } else {
        TEACHERS.splice(teacherIndex,1);
        res.send("Delete successfully");
    }
})

module.exports = teacherRouter;