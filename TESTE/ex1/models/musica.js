var mongoose = require("mongoose");

var instrumentoSchema = new mongoose.Schema({
    designacao: String,
    partitura: {
        path: String,
        voz: String
    }
})

var musicaSchema = new mongoose.Schema({
    id: String,
    titulo: String,
    tipo: String,
    compositor: String,
    instrumentos: [instrumentoSchema]
});


module.exports = mongoose.model("musicas", musicaSchema);