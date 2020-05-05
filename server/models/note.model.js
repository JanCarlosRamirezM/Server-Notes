const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    note: {
        type: String,
        trim: true,
    },
    background: {
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

mongoose.pluralize(false);
module.exports = mongoose.model('Note', noteSchema)