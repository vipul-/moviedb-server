const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const movieSchema = new mongoose.Schema({
    title: String,
    mainLanguage: String,
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
    keywords: Array,
    cast: Array,
    inTheatres: Boolean
});

movieSchema.index({
    title: 'text',
    keywords: 'text'
});

module.exports = mongoose.model("Movie", movieSchema);