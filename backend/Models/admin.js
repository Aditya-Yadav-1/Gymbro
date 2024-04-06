const mongoose = require('mongoose')
const { Schema } = mongoose;

const adminSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    gym_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    MemberList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member'
    }]
});

module.exports = mongoose.model('admin', adminSchema);