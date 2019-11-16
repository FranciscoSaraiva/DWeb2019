var Movie = require('../models/Movie')

const Movies = module.exports;

//works
Movies.showAll = title => {
    if (title == "" || title == undefined) {
        console.log('TITLE EMPTY')
        return Movie
            .find()
    }
    else {
        let regex = new RegExp(title, 'i')
        console.log('TITLE NOT EMPTY')
        return Movie
            .find({ title: regex })
    }
}

//works
Movies.show = id => {
    return Movie
        .findOne({ _id: id })
}

//works
Movies.insert = body => {
    return Movie
        .create(body)
}

//works
Movies.update = (id, body) => {
    let idQuery = { _id: id };
    return Movie
        .findOneAndUpdate(idQuery, body, { new: true })
}

//works
Movies.delete = id => {
    return Movie
        .deleteOne({ _id: id })
}

Movies.count = () => {
    return Movie
        .countDocuments()
}

Movies.project = fields => {
    return Movie
        .find({}, fields)
        .exec()
}

Movies.aggregate = field => {
    return Movie
        .aggregate([
            { $group: { _id: "$" + field, counter: { $sum: 1 } } },
            { $sort: { counter: -1 } }])
        .exec()
}