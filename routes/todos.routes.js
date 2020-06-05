const { Router } = require("express");
const Todo = require('../models/Todo');
const auth = require('../middleware/auth.middleware');
const router = Router();

// /api/todos/
router.get('/', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ owner: req.user.userId })
        res.json(todos)
    } catch (e) {
        res.status(500).json({ message: 'Something go wrong. Try again' })
    }
})

// /api/todos/:id (DELETE)
router.delete('/:id', auth, async (req, res) => {
    try{
        await Todo.deleteOne({_id: req.params.id})
        const todos = await Todo.find({ owner: req.user.userId })
        res.json(todos);
    } catch (e) {
        res.status(400).send('deleting todo failed')
    }
})

// /api/todos/createit
router.post('/createit', auth, async (req, res) => {
    try {
        const { description, completed } = req.body;
        const todo = new Todo({
            description, completed, owner: req.user.userId
        })

        await todo.save();
        res.status(201).json({ todo })

    } catch (e) {
        res.status(500).json({ message: 'Something go wrong. Try again' + e })
    }
})

module.exports = router;