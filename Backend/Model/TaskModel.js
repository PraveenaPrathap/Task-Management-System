const mongoose = require("mongoose");// import mongoose library in 

const Schema = mongoose.Schema;// schema create from mongoose

const TaskSchema = new Schema(// create schema for the database
    {// creating structure as fields
        title:{ // feild
            type:String, // datatype
            require:true// manditory field
        },
        description:{
            type: String,
        },
    },
        { timestamps: true}// tracking the time which time created and updated 
);

module.exports = mongoose.model("Tasks", TaskSchema);// create model (Task) and the model created by taskschema and export those 


