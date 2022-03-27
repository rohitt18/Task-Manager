const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks");
const connectDB = require("./db/connect");
const dotenv = require("dotenv").config();
const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
// routes
// 1. get req that gets me all my items 
// 2. post req that can create a new task
// 3. delete req that can delete task
// 4. put req that can edit task

// Therefore the routes will look something like this =>
// app.get("/api/v1/tasks")      - get all the tasks
// app.post("/api/v1/tasks")      - create a new task
// app.get("/api/v1/tasks/:id")      - get single task
// app.patch("/api/v1/tasks/:id")      - update task
// app.delete("/api/v1/tasks/:id")      - delete task

// middleware
app.use(express.static("./public"));

app.use(express.json())  // if we dont use this then we won't have that data in req.body 


// setting up the middleware & "/api/v1/tasks" as a root route for the tasks router
// & since we'll be sending json from our application eg-when we're creating a new task & since i wanna access that data 
// in my routes, what do we need to do? ofc it is to get middleware that is built into express & that middleware is express.json
// setting up above app.get
 
// routes

app.use("/api/v1/tasks", tasksRouter)

// middleware func that will handle the 404 & send some kind of custom response
app.use(notFound);

// middleware func for 500 error-handler which we write in the catch block
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

// since my connectDB returns a promise, so i can set this function as async-await
// And everytime we have async operation it's very useful to set it in the try-catch block
// so that way if there is an error, we can handle it as well. 
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Server is running on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}
start()

