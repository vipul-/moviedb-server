//Dependencies
require('dotenv').config({
    path: 'variables.env'
});
const express = require('express');
const mongoose = require('mongoose');


//Config
const app = express();

mongoose.connect(`mongodb://${process.env.dbUser}:${process.env.dbPass}@${process.env.dbUrl}`, {
    useNewUrlParser: true
});


//Routes
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