const { ObjectId } = require("mongodb");

const { db } = require("../utils/connectToDB");
const isAdmin = require("../middleware/isAdmin");

const getAllUsers = async (req,res)=>{
    const users = await db.users.find().toArray();
    res.status(200).json({
        message: "Get All User Successfully!!",
        data: users,
    });
};
const getUserById = async (req,res) => {
    const id = req.params.id;
    const user = await db.users.findOne({
        _id: new ObjectId(id),
    });
    res.status(200).json({
        message: "Get user With Id Successfully!!",
        data: user,
    });
};

const createUser = async (req, res) =>{
    const {username,password,isAdmin} = req.body;
    const checkExist = async ()=>{
        const foundUserByName = await db.users.findOne( {username: username})
        if(foundUserByName) return true;
        return false;
    }
    if(await checkExist()){
        res.json({
            message: "Username Already Exist, Please Choose Another One !!",
        })
        return;
    } else {
        const newuser = {
            username: username,
            password: password,
            isAdmin: isAdmin,
        };
        const user = await db.users.insertOne(newuser);
        res.status(201).json({
            message: "Create Successfully!!",
            data: newuser,
        });
    }
}

const updateUser = async (req,res) =>{
    const id = req.params.id;
    const {name,password, type} = req.body;
    await db.users.updateOne({
        _id: new ObjectId(id),
    },
    {
        $set:{
            name: name,
            password: password,
        }
    });
    res.status(200).json({
        message: "Update Successfully!!",
        data: {...req.body, _id: id},
    });
};

const deleteUser = async (req,res)=>{
    const id = req.params.id;
    await db.users.deleteOne({
        _id: new ObjectId(id),
    });
    res.status(200).json({
        message: "Delete Successfully!!",
    });
};

module.exports = { getAllUsers,getUserById,createUser,updateUser,deleteUser, };
