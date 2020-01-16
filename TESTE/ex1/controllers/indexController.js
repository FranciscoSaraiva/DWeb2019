var musica = require("../models/musica");

const musicas = module.exports;

musicas.listar = (compositor, instrumento) => {
    var query = [
        { $project: { _id: false, id: true, titulo: true, tipo: true, compositor: true } }
    ]

    if (compositor != "" && compositor != undefined)
        query.push({ $match: { compositor: compositor } })

    if (instrumento != "" && instrumento != undefined && compositor == undefined)
        return musica.find({ "instrumentos": { $elemMatch: { "partitura.voz": instrumento } } }).exec();

    return musica.aggregate(query);
};

musicas.encontraID = (id) => {
    return musica.findOne({ id: id }).exec();
}

musicas.listarTipos = () => {
    return musica.distinct("tipo").exec();
}

musicas.obrasQuant = () => {
    return musica.aggregate([
        { $project: { _id: 0, id: true, titulo: true, partituras: {$size: "$instrumentos"} } },
    ]).sort({ musica: true });
}


