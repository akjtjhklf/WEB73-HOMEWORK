const express = require("express")

const teacherRouter = require("./routes/teachers")
const logRequestTime = require("./middleware/logRequestTime");


const app = express()
const port = 3001

app.use(logRequestTime);


app.get('/', (req, res) => {
    res.send('Hello, this is my homepage')
})
app.use("/teachers", teacherRouter);


app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`)
})