const express = require("express");

const teacherRouter = require("./routes/teachers");
const usersRouter = require("./routes/users");
const logRequestTime = require("./middleware/logRequestTime");
const authRouter = require("./routes/auth");


const app = express();
const port = 3001;

app.use(express.json());
app.use(logRequestTime);
app.use("/teachers", teacherRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.get('/', (req, res) => {
    res.send('Hello, this is my homepage');
})

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})