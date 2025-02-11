const express = require('express')
const Task = require('../models/task')

const router = express.Router()

//Task Routes
    //Create Task
    router.post('/createTask', async (req, res) => {
        try {
            const {userId, title, description, tasks} = req.body
            const newTask = new Task({userId, title, description, tasks})
            await newTask.save()
            res.status(201).json(newTask)
        } catch (error) {
            res.status(500).json({error})
        }
    })

    //Read Tasks
    router.get('/readTasks/{userId}', async (req, res) => {
        try {
            const {userId} = req.params
            const tasks = await Task.find({userId})
            
            if(tasks.lenght === 0) {
                res.status(404).json({message: 'Nenhuma tarefa encontrada.'})
            }
            res.status(200).json(tasks)
        } catch (error) {
            console.log('Erro ao buscar tarefas: ', error)
            res.status(500).json({error: 'Erro ao buscar terefas'})
        }
    })

    //Update Task
    router.put('/updateTask/{_id}', async (req, res) => {
        try{
            const {_id} = req.params
            const {userId ,title, description, tasks} = req.body

            const updatedTask = await Task.findByIdAndUpdate(_id, {title, description, tasks})
        }catch(error){

        }
    })


module.exports = router