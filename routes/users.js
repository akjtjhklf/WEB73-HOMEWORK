const express = require("express");

const usersRouter = express.Router();

const USERS = require("../mock/users");
const isAdmin = require("../middleware/isAdmin");
const users = require("../mock/users");

usersRouter.get("/",isAdmin, (req, res)  => {
    res.json({
        message: "Get Successfully!!",
        data: USERS,
    });
})

usersRouter.get("/:id",isAdmin, (req, res)  => {
    const foundUser = USERS.find((user) => user.id === parseInt(req.params.id))
    if(foundUser){
        res.json(foundUser);
    } else {
        res.json({
            message: "User Not Found!!!",
        });
    };
});

usersRouter.post("/", (req,res) =>{
    if( USERS.some((user)=> user.username === req.body.username)){
        res.json({
            message: "Username Already Exist, Please Choose Another One !!",
        })
        return;
    }
    const newUser = {
        id: USERS.length + 1,
        ...req.body,
    };
    USERS.push(newUser);
    res.json({
        message: "Create Successfully!",
        data: newUser,
    })
});

usersRouter.post("/login", (req,res) =>{
    const {username,password} = req.body;
    if(!USERS.find((user) => user.username === username)){
        res.json({
            message: "User Is Not Exist!!",
        });
    } else if(!USERS.find((user) => (user.password === password))){
        res.json({
            message: "Wrong Password !!",
        });
    } else{
        res.json({
            message: "Login Successfully!!",
            data: req.body,
        });
    };
});

usersRouter.put("/:id", (req,res)=>{
    const index = USERS.findIndex((user) => user.id === parseInt(req.params.id));
    if(index === -1){
        res.json({
            message: "User Not Found!!",
        })
    } else {
        const newteacher = {...USERS[index], ...req.body};
        USERS[index]= newteacher;
        res.json({
            message: "Update User Successfully!!",
            data: newteacher,
        });
    };
});

usersRouter.delete("/:id",isAdmin, (req,res)=>{
    const index = USERS.findIndex((user) => user.id === parseInt(req.params.id));
    if(index === -1){
        res.json({
            message: "User Not Found!!",
        })
    } else {
        USERS.splice(index,1);
        res.json({
            message: "Delete Successfully!!",
        });
    };
});

module.exports = usersRouter;