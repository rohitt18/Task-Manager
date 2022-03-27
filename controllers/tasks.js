const Task = require("../models/Task");
const asyncWrapper = require("../middlewares/async");
const { createCustomError,CustomAPIError } = require("../errors/custom-error") 

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}); // here we use the find static function since i want to get all the tasks therefore i'll just pass in an empty object
    res.status(200).json({ tasks }); // so ill be sending back the object
    // res.status(200).json({ tasks, amount:tasks.length });
    // res.status(200).json({ success:true,data:{ tasks, nbHits: tasks.length } }); // nbHits => no. of hits   
  } catch (error) {
    res.status(500).json({ msg: error });
  } // output - we will have our array in which we will have items & ofc each item is represented as an object
};


// since we know we can access the task data in the req.body why dont we just pipe it through
// & pass it along to our model.create and its going to work something like this
// instead of sending it back we'll pass it into Task.create. Now since im gonna use await on Task.create
// ofc i wanna refactor this as async
const createTask = asyncWrapper( async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
}); // try-catch block nahi use kiya hai bec asynWrapper laga diya hai


// general setup will be pretty similar to getAllTasks
// however we'll also have to implement a specific response if the id that we pass in doesn't match with any of the tasks
// *** findById( jiska _id req.params.id se match hota hai usse) ***
const getSingleTask = asyncWrapper( async (req, res, next) => {
    // const { id } = req.params;
    const task = await Task.findById({ _id: req.params.id }); // Model.findById() or Model.findOne() static helper function from mongoose docs.
    if (!task) {   // we can create a new error object to handle to 404 errors using the built in JS error constructor
      return next(createCustomError(`No task with id:${req.params.id}`, 404));  // return likhna mat bhulna galti se bhi varna pura app crash ho jayega
    }
    res.status(200).json({ task });
});
// this is going to be somewhat common setup for update & delete controllers as well bec at the end of the day
// for both of them we still have to find that one specific item & if we're not successful then we'll send back 404
// but we'll always have this generic one as well which is 500

const deleteTask = asyncWrapper( async (req, res, next) => {
    const task = await Task.findByIdAndDelete({ _id: req.params.id });
    if (!task) {
      return next(createCustomError(`No task with id:${req.params.id}`, 404)); // return likhna mat bhulna galti se bhi varna pura app crash ho jayega
    }
    res.status(200).json({ task }); // this way we'll be able to see which task we removed
});

// there's going to be a bit more functionality bec in this case not only are we looking for the id
// but we'll also need the body since we'll be updating something & we have to pass in some options
// req.params.id & req.body both will be used
const updateTask = asyncWrapper( async (req, res, next) => {
    const task = await Task.findByIdAndUpdate({ _id: req.params.id }, req.body,{     // setting up the second parameter as req.body bec we need to pass in that new data since we're updating something
      new:true,    // this will always always always return that new item the one that is already updated
      runValidators: true,   // to run the validators
    }); 
    if (!task) {
      return next(createCustomError(`No task with id:${req.params.id}`, 404)); // return likhna mat bhulna galti se bhi varna pura app crash ho jayega
    }
    res.status(200).json({ task }); 
});  
// so once i send the data while updating, we will get the original data & when i getAllTasks then we find that its updated
// the reason why this is happening is bec we're not passing in the options (third parameter) & as far as the options we want to do 2 things
// we want to get the new one back bec by default we're getting the old one thats why we were successful but in our update response we got old value
// And second thing is the fact that were not running validators
// so pass the third parameter(options object) as {new:true,runValidators:true} in all the controllers.

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
