const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    language: String,
    overview: String,
    posterPath: String,
    status: String,
    releaseDate: Date,
    budget: Number,
    revenue: Number,
    runtime: Number,
    favourite_count: Number,
    watchlist_count: Number,
    production_countries: Array,
    production_companies: Array,
    genre: Array,
    average_rating: Number,
    keywords: Array
});

module.exports = mongoose.model("Movie", movieSchema);