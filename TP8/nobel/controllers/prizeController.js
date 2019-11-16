var Prize = require('../models/Prize')

const Prizes = module.exports;

// work
Prizes.getPrizes = (category, date) => {
    console.log(category)
    console.log(date)
    var query = [
        { $project: { _id: false, year: true, category: true } }
    ]

    if (category != "" && category != undefined)
        query.push({ $match: { category: category } })

    if (date != "" && date != undefined)
        query.push({ $match: { year: date } })

    console.log(query)
    return Prize.aggregate(query);
}

//work
Prizes.getPrize = (id) => {
    return Prize.findOne({ _id: id });
}

//work
Prizes.getCategories = () => {
    return Prize.collection.distinct('category')
}

//work
Prizes.getLaureates = () => {
    return Prize.aggregate([
        { $unwind: "$laureates" },
        {
            $group: {
                _id: "$laureates.id",
                name: { $first: "$laureates.firstname" },
                surname: { $first: "$laureates.surname" },
                nobels: {
                    $push: {
                        year: "$year",
                        category: "$category"
                    }
                }
            }
        }
    ]).sort({ name: true, surname: true });
}
