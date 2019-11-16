var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var LaureateSchema = new Schema({
    id: { type: String, required: true },
    firstname: { type: String, required: true },
    surname: { type: String, required: true },
    motivation: { type: String, required: true },
    share: { type: String, required: true }
})

var PrizeSchema = new Schema({
    year: { type: String, required: true },
    category: { type: String, required: true },
    laureates: [LaureateSchema]
})

module.exports = mongoose.model('prizes', PrizeSchema);