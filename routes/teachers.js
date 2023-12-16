const express = require("express");

const teacherRouter = express.Router();

const TEACHERS = require("../mock/teachers");
const requireAPIKey = require("../middleware/requireAPIKey");
const logRequestMethod = require("../middleware/logRequestMethod")

teacherRouter.use(requireAPIKey);
teacherRouter.use("/:id", logRequestMethod);

teacherRouter.get("/", (req, res) => {
    res.json(TEACHERS);
})

teacherRouter.get("/add", (req, res) => {
    const newTeacher = { name: Daniel, age: 32 }
    TEACHERS.push(newTeacher)
    res.json(TEACHERS)
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


module.exports = teacherRouter;