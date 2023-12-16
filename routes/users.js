const express = require("express");

const usersRouter = express.Router();

const isAdmin = require("../middleware/isAdmin");
const userController = require("../controllers/usersController");

usersRouter.get("/",isAdmin, userController.getAllUsers);

usersRouter.get("/:id",isAdmin, userController.getUserById);

usersRouter.post("/", userController.createUser);

usersRouter.put("/:id", userController.updateUser);

usersRouter.delete("/:id",isAdmin, userController.deleteUser);

module.exports = usersRouter;