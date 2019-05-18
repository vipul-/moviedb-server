require('dotenv').config({
    path: 'variables.env'
});
const mongoose = require('mongoose');
const Movie = require("./models/movie");


mongoose.connect(process.env.dbURI, {
    useNewUrlParser: true
});

const upcomming = (page) => {
    return Movie
         .find({
             status: {
                 $ne: "Released"
             },
             releaseDate: {
                 $gte: new Date()
             },
         })
         .sort({
             'releaseDate': 1
         })
         .skip(page * 5) //page starts with index 0
         .limit(5);
};

const topRated = (page) => {
    return Movie
        .find({
            status: {
                $ne: "Released"
            }
        })
        .sort({
            'average_rating': -1
        })
        .skip(page * 5) //page starts with index 0
        .limit(5);
}

const inTheatres = (page) => {
    return Movie
        .find({
            inTheatres: true
        })
        .sort({
            'releaseDate': -1
        })
        .skip(page * 5) //page starts with index 0
        .limit(5);
}



module.exports = {
    upcomming,
    topRated,
    inTheatres
}