// make user model 
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30,
        unique: true
    },

    phone:{
        type: String,
        required: true,
        minlength: 4,
        maxlength: 15,
        unique: true
    },
    compID:{
        type: String,
        required: true,
        minlength: 5,
        maxlength:11,
        default:'COMP-123FH5',
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },

    role: {
        type: String,
        enum: ['Admin', 'user'],
        default: 'user'
      }
});

// creating model 
const User = mongoose.model('User', userSchema);



module.exports = User;