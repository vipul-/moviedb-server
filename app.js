//Dependencies
require('dotenv').config({
    path: 'variables.env'
});
const express = require('express');

//Config
const app = express();

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