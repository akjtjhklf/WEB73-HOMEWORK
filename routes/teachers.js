const express = require("express");

const teacherRouter = express.Router();

const teacherController = require("../controllers/teachersController");
const verifyJwt = require("../middleware/verifyJwt");
const logRequestMethod = require("../middleware/logRequestMethod");

teacherRouter.use(verifyJwt);
teacherRouter.use("/:id", logRequestMethod);


teacherRouter.get("/", verifyJwt , teacherController.getTeachers );

teacherRouter.get("/:id", verifyJwt , teacherController.getTeacherById );

teacherRouter.post("/", verifyJwt , teacherController.createTeacher );

teacherRouter.put("/:id", verifyJwt, teacherController.updateTeacher );

teacherRouter.delete("/:id", verifyJwt, teacherController.deleteTeacher );

module.exports = teacherRouter;