//Dependencies
require('dotenv').config({
    path: 'variables.env'
});
const express = require('express');
const mongoose = require('mongoose');
const Movie = require("./models/movie");


//Config
const app = express();

mongoose.connect(process.env.dbURI, {
    useNewUrlParser: true
});


//Routes
app.get('/upcomming', (req, res) => {
    Movie
        .find({
            status: {
                $ne: "Released"
            },
            releaseDate: {
                $gte: new Date()
            },
        })
        .sort({'releaseDate': 1})
        .limit(5)
        .exec((error, result) => {
            if (error) {
                console.log(error);
            } else {
                res.send(result);
            }
        });
});

app.get('/find', (req, res) => {
    res.send("This is the /find route");
});

app.get('/discover', (req, res) => {
    res.send("This is the /discover route");
});

app.get('/search', (req, res) => {
    res.send("This is the /search route");
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

process.on('SIGINT', () => {
    mongoose.connection.close(function () {
        console.log("Mongoose connection disconnected due to application termination");
        process.exit(0)
    });
});