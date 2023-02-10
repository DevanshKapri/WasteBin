const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user',
    },
    status : {
        type : String,
        default : 'pending' // pending ongoing accepted rejected
    },
    collector : {
        type : Schema.Types.ObjectId,
        ref : 'user',
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('request', requestSchema)