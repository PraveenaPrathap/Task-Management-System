const express = require('express')//Import the express module

const router = express.Router()// Create a  router object using Express for task-related routes.

const{createTask, getTasks,getSingleTask, updateTask,deleteTask} = require("../controllers/taskController"); //import controller functions from the taskController file

router.post("/", createTask);//POST route to create a new task
router.get("/", getTasks);//Get route to get all task
router.get("/:id", getSingleTask)//Get route to get specified task
router.patch("/:id", updateTask)//Get route to update specified task
router.delete("/:id", deleteTask)//Get route to delete specified task
module.exports = router;//Export the router to use it on other parts of the application