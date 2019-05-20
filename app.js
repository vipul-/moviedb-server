//Dependencies
require('dotenv').config({
    path: 'variables.env'
});
const express = require('express');
const mongoose = require('mongoose');
const Movie = require("./models/movie");
const dbQuery = require('./mongoQuery');


//Config
const app = express();

mongoose.connect(process.env.dbURI, {
    useNewUrlParser: true
});


//Routes
app.get('/upcomming', (req, res) => {
    let page = req.query.page; //page starts with index 0

    dbQuery.upcomming(page).exec((error, result) => {
        if (error) {
            console.log(error);
            res.send("An error occured while quering the database.");
        } else {
            res.send(result);
        }
    });
});


app.get('/top_rated', (req, res) => {
    let page = req.query.page; //page starts with index 0

    dbQuery.topRated(page).exec((error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.send(result);
        }
    });
});

app.get('/in_theatres', (req, res) => {
    let page = req.query.page; //page starts with index 0

    dbQuery.inTheatres(page).exec((error, result) => {
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
    dbQuery.discover(req.query).exec((error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.send(result);
        }
    });
});

app.get('/search', (req, res) => {
    let searchString = req.query.query;
    let page = req.query.page; //page starts with index 0

    dbQuery.search(searchString, page).exec((error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.send(result);
        }
    });
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