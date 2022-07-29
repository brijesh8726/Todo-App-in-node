const { redirect } = require('express/lib/response');
const { Passport } = require('passport/lib');
const connectMongoose = require('../db_con')
const{model ,users} = require('../models/task');

connectMongoose();



const CreateTasks = async (req, res) => {

    try {
        
        const task = await model.create(req.body)
        // console.log(req.body);
        // res.status(201).json({task})

        res.redirect('/home');


    } catch (error) {
        console.log(error);

    }
}


const getAllTasks = async (req, res) => {
    try {
        // console.log(req.user.id);
        
        const task = await model.find({userid:req.user.id});

        return task
        res.status(200).json({ task })


    } catch (error) {
        res.status(500).json({ msg: error })
    }

};
const getTask = async (req, res) => {
    try {
        const task = await model.findOne({ _id: req.params.id })

        res.send(task);
        if (!task) {
            res.status(404).json({ msg: 'No task with id: ${task.id}' })

        }
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

const UpdateTasks = async (req, res) => {
    try {
        
        const id  = req.params.id      
    const task = await model.updateOne({ _id: id }, {$set:{name:req.body.name}}, { new: true, runValidators: true })
    res.redirect('/home');
       
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

const DeleteTasks = async (req, res) => {
    try {


        const task = await model.deleteOne({ _id: req.params.id }, { $set: req.body })
       
        res.redirect('/home');


    } catch (error) {
        res.status(200).json({ msg: error })
    }

}


module.exports = { getAllTasks, getTask, UpdateTasks, DeleteTasks, CreateTasks }