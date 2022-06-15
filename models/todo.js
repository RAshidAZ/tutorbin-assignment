let mongoose = require('./db');

// grab the things we need
let Schema = mongoose.Schema;

// create a schema
let todoSchema = new Schema({

    title: String,
    description: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    
    isCompleted: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false }

}, { minimize: false, timestamps: true }); // Minimize : false --> It stores empty objects.

// we need to create a model using it
let todo = mongoose.model('todo', todoSchema);

module.exports = todo;