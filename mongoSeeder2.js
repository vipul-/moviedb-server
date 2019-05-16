require('dotenv').config({
    path: 'variables.env'
});

const faker = require("faker");
const Movie = require("./models/movie")
const mongoose = require('mongoose');

mongoose.connect(process.env.dbURI, {
    useNewUrlParser: true
});

const genreArray = [
    "Absurdist/surreal/whimsical",
    "Action",
    "Adventure",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Historical",
    "Historical fiction",
    "Horror",
    "Magical realism",
    "Mystery",
    "Paranoid",
    "Fiction",
    "Philosophical",
    "Political",
    "Romance",
    "Saga",
    "Satire",
    "Science fiction",
    "Social",
    "Speculative",
    "Thriller",
    "Urban",
    "Western"
];

let randomGenre = () => {
    return faker.random.arrayElement(genreArray);
};


//Random Length array generator
const arrayGenerator = (max, elementGenerator) => {
    let generatedArray = [];
    let randomnum = faker.random.number({
        min: 1,
        max
    });
    for (let i = 1; i <= randomnum; i++) {
        generatedArray.push(elementGenerator());
    }
    return generatedArray;
}


for (let i = 0; i < process.env.seedCount; i++) {
    let seedData = {
        title: faker.random.words(),
        language: faker.random.locale(),
        overview: faker.lorem.paragraph(),
        posterPath: faker.random.image(),
        status: faker.random.arrayElement(["Released", "Post Production", "In Production"]),
        releaseDate: faker.date.past(),
        budget: faker.random.number({min:100000, max:50000000}),
        revenue: faker.random.number({min:10000000, max:500000000}),
        runtime: faker.random.number({min:40, max:190}),
        favourite_count: faker.random.number(10000),
        watchlist_count: faker.random.number(10000),
        production_countries: arrayGenerator(8, faker.address.country),
        production_companies: arrayGenerator(8, faker.company.companyName),
        genre: arrayGenerator(6, randomGenre),
        average_rating: faker.finance.amount(0.1,5,1),
        keywords: arrayGenerator(10, faker.random.word),
        cast: arrayGenerator(20, faker.name.findName)
    };


    Movie.create(seedData, (error, addedData) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Added new data", addedData);
        }
    });
}

process.on('SIGINT', () => {
    mongoose.connection.close(function () {
        console.log("Mongoose connection disconnected due to application termination");
        process.exit(0)
    });
});