var Obra = require('../models/obra')

const Obras = module.exports;

// work
Obras.getObras = (ano, compositor, periodo, duracao) => {
    console.log(ano)
    console.log(compositor)
    console.log(periodo)
    console.log(duracao)

    var query = [
        { $project: { _id: true, nome: true, desc: true, anoCriacao: true, periodo: true, compositor: true, duracao: true } }
    ]

    if (ano != "" && ano != undefined)
        query.push({ $match: { anoCriacao: ano } })

    if (compositor != "" && compositor != undefined)
        query.push({ $match: { compositor: compositor } })

    if (periodo != "" && periodo != undefined)
        query.push({ $match: { periodo: periodo } })

    if (duracao != "" && duracao != undefined)
        query.push({ $match: { duracao: { $gte: duracao } } })


    console.log(query)
    return Obra.aggregate(query);
}

//work
Obras.getObra = (id) => {
    return Obra.findOne({ _id: id });
}

Obras.getCompositores = () => {
    return Obra.distinct('compositor');
}

Obras.getPeriodos = () => {
    return Obra.distinct('periodo');
}