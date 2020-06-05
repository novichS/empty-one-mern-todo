const { Router } = require("express");
const Todo = require('../models/Todo');
const router = Router();

// /api/todos/
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({ owner: req.user.userId })
        res.json(todos)
    } catch (e) {
        res.status(500).json({ message: 'Something go wrong. Try again' })
    }
})

// /api/todos/:id (DELETE)
router.delete('/:id', async (req, res) => {
    try{
        await Todo.findByIdAndDelete(req.params.id)
        res.json('Updated');
    } catch (e) {
        res.status(400).send('deleting new todo failed')
    }
})

// /api/todos/createit
router.post('/createit', async (req, res) => {
    console.log(req.body)
    try {
        const { description, completed, owner } = req.body;
        const todo = new Todo({
            description, completed, owner
        })

        await todo.save();
        res.status(201).json({ todo })

    } catch (e) {
        res.status(500).json({ message: 'Something go wrong. Try again' })
    }
})

module.exports = router;