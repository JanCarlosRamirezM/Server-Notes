// -------------------------------
// Model User  
// -------------------------------
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    registry: {
        type: Date,
        default: Date.now()
    }
});
mongoose.pluralize(false);
module.exports = mongoose.model('User', UserSchema)

