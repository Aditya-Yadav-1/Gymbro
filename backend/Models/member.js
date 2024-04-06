const mongoose = require('mongoose')
const { Schema } = mongoose;

const memberSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    phone_no:{
        type: String,
        required: true
    },
    email:{
        type: String
    },
    fee_paid_date:{
        type: Date,
        default : Date.now
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    }
});

module.exports = mongoose.model('member', memberSchema);