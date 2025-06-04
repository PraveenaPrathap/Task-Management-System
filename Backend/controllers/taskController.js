const mongoose = require("mongoose")// import moongoose
const taskmodel = require("../Model/TaskModel");  // import the taskModel.js to interact with taskcontroller
const { emitTaskUpdate } = require('../socketManager'); // Import from the new manager


//create the function to create the task(post opertation )
const createTask = async (req,res) =>{  //asynchronous function to handle the creation of  create task (POST request)
    const{title, description} = req.body //title and description fields from req.body to access task input data

    try{
        const task = await taskmodel.create({title,description})// creates a new document in MongoDB using the taskmodel.
          emitTaskUpdate();
        res.status(200).json(task);// Send a success response with the created task and status code 200
    }catch (e){
        res.status(400).json({error:e.message});//send a response with status code 400 and the error message

    }
};


// Controller function to retrieve all tasksfrom the database
//to get all task - get
const getTasks = async(req,res) =>{
    try{
        const tasks = await taskmodel.find({});// (this is empty object -{})Retrieve all task documents from the database 
        res.status(200).json(tasks)//Send a success response with the list of tasks and status code 200
    }catch (e){
        res.status(400).json({error:e.message});// send a response with status code 400 and the error message
    }
}



//Controller function to retrieve a single task by its ID
//to get a singletask- get
const getSingleTask = async (req,res) =>{
    const {id} = req.params// the task ID from the URL parameters
    if(!mongoose.Types.ObjectId.isValid(id)){//Check if the ID is a valid MongoDB ObjectId
        return res.status(404).json({message:'Task Not Found'})
    }
    try{
        const singleTask = await taskmodel.findById(id)// Find the task by its ID in the database
        res.status(200).json(singleTask);
    }catch (e){
        res.status(400).json({error:e.message});
    }
};



//To update task - PATCH
const updateTask = async (req,res) =>{    
    const {id} = req.params;// passinng the params into ID to upadte the specified task 
    if(!mongoose.Types.ObjectId.isValid(id)){ // checking the passed Id is in the database
        return res.status(404).json({error: "error not found" })// if the Id is not error message will pass
    }
    try{
        const task  = await taskmodel.findByIdAndUpdate(
            {
                _id:id    //key in database to find and update 
            },
            {
                ...req.body   //send server to update from body

            });
            emitTaskUpdate();
            res.status(200).json(task);// while update old value will initially return
    }catch (e){
        res.status(400).json({error: e.message});// decription in not update error mesage will display
    }
};


//To delete task -DELETE
const deleteTask = async (req,res) => {
    const {id} = req.params;//passinng the params into ID to delete the specified task 
    if(!mongoose.Types.ObjectId.isValid(id)){//checking the passed Id is in the database
        return res.status(404).json({error:"Task not found"})//if the Id is not error message will pass
    }
    try{
        const task = await taskmodel.findByIdAndDelete(id);// find the id and delete the task in database 
            emitTaskUpdate();
            res.status(200).json(task);   //success message while the task is delete 
    }catch(e){
            res.status(400).json({error: e.message});// failure message for task is not delete  
    }
};

module.exports = {createTask, getTasks, getSingleTask, updateTask, deleteTask}; //Export the controller functions so they can be used in route definitions