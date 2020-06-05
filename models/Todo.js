const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Todo', schema)