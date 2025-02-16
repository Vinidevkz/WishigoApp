const express = require('express')
const Task = require('../models/task')

const router = express.Router()

const authMiddleware = require('../auths/authMiddleware')

//Task Routes

    //All Tasks
    router.get('/all', async (req, res) => {
        try {
            const allTasks = await Task.find()
            res.status(200).json(allTasks)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })

    //Create Task
    router.post('/createTask', async (req, res) => {
        try {
            const {userId, title, description, priority, tasks} = req.body
            const newTask = new Task({userId, title, description, priority, tasks})
            await newTask.save()
            res.status(201).json(newTask)
        } catch (error) {
            res.status(500).json({error})
        }
    })

    //Read Tasks
    router.post('/readTask', async (req, res) => {
        try {
            const id = req.userId
            const tasks = await Task.find({id})
            
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
            res.status(200).json(updatedTask)
        }catch(error){
            res.status(500).json({error: 'Erro aao atualizar a terefa.'})
        }
    })


module.exports = router