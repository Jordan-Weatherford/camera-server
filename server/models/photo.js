var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PhotoSchema = new mongoose.Schema({
    location: {type: String, required: true, minlength: 1},
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    altitude: {type: Number, required: true},
    username: String
}, {timestamps: true})

mongoose.model('Photo', PhotoSchema)