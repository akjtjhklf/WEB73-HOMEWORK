const { MongoClient } = require("mongodb");

const mongoDbUrl = "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoDbUrl);

const dbName = "web73-lesson";
const db= {};

const connectToDB = async () => {
    await client.connect();
    console.log("Connected Successfully to database");
    const database = client.db(dbName);
    db.teachers = database.collection("teachers");
    db.students = database.collection("students");
    db.users = database.collection("users");
};

module.exports = { connectToDB,db };
