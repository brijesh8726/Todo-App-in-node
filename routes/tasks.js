const express = require('express')
const router = express.Router();

const {getAllTasks,getTask,UpdateTasks,DeleteTasks,CreateTasks} = require("../controller/tasks");




router.route('/').get(getAllTasks).post(CreateTasks)
router.route('/:id').get(getTask).post(UpdateTasks).delete(DeleteTasks)

module.exports = router
