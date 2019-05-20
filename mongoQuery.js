require('dotenv').config({
    path: 'variables.env'
});
const mongoose = require('mongoose');
const Movie = require("./models/movie");


mongoose.connect(process.env.dbURI, {
    useNewUrlParser: true
});

const resultsPerPage = 10; 


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
         .skip(page * resultsPerPage) //page starts with index 0
         .limit(resultsPerPage);
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
        .skip(page * resultsPerPage) //page starts with index 0
        .limit(resultsPerPage);
};

const inTheatres = (page) => {
    return Movie
        .find({
            inTheatres: true
        })
        .sort({
            'releaseDate': -1
        })
        .skip(page * resultsPerPage) //page starts with index 0
        .limit(resultsPerPage);
};

const search = (searchString, page) => {
    return Movie
        .find({$text: { $search: searchString}})
        .skip(page * resultsPerPage) //page starts with index 0
        .limit(resultsPerPage);
};

const discover = (query) => {
        query.page = query.page === undefined?0:query.page;
        return Movie
        .aggregate([
                {$project: { title:1, releaseDate:1 ,"year" : {$year: '$releaseDate'}}},
                {$match: { 
                    year: parseInt(query.year)
                }},
                { $skip: (query.page*resultsPerPage) },
                { $limit: resultsPerPage }
        ]);
}

const find = (id) => {
    return Movie.findById(id);
};

module.exports = {
    upcomming,
    topRated,
    inTheatres,
    search,
    discover,
    find
}

process.on('SIGINT', () => {
    mongoose.connection.close(function () {
        console.log("Mongoose connection disconnected due to application termination");
        process.exit(0)
    });
});