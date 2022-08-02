const express = require('express')
const router = express.Router();

const {GetAllTasks,GetTask,UpdateTasks,DeleteTasks,CreateTasks} = require("../controller/tasks");




router.route('/').get(GetAllTasks).post(CreateTasks)
router.route('/:id').get(GetTask).post(UpdateTasks).delete(DeleteTasks)

module.exports = router
