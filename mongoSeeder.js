require('dotenv').config({
    path: 'variables.env'
});

const mongoSeedFaker = require("mongo-seed-faker");
const faker = require("faker");

const dbUri = process.env.dbURI;
const dbName = 'moviedb';

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
const arrayGenerator = (max=5, elementGenerator=randomGenre) => {
    let generatedArray = [];
    let randomnum = faker.random.number({min: 1, max});
    console.log(randomnum);
    for (let i = 1; i<= randomnum; i++) {
        generatedArray.push(elementGenerator());
    }
    return generatedArray;
}


const seedData = [{
    collectionName: 'movies',
    seedOnlyIfEmpty: true,
    // if want to populate same structure of data multiple times
    template: {
    title: '@faker.random.words()',
    language: '@faker.random.locale()',
    overview: '@faker.lorem.paragraph()',
    posterPath: '@faker.random.image()',
    status: '@faker.random.arrayElement(["Released", "Post Production", "In Production"])',
    releaseDate: '@faker.date.past()',
    budget: '@faker.random.number({min:100000, max:50000000})',
    revenue: '@faker.random.number({min:10000000, max:500000000})',
    runtime: '@faker.random.number({min:40, max:190})',
    favourite_count: '@faker.random.number(10000)',
    watchlist_count: '@faker.random.number(10000)',
    //production_countries: '@faker.fake("['{{address.country}}', '{{address.country}}', '{{address.country}}']")',
    // production_companies: Array,
    genre: arrayGenerator(),
    average_rating: '@faker.finance.amount(0.1,5,1)',  
    // keywords: Array
    // cast:
    },
    // how many times to populate data specified by 'template' 
    howMany: 10,
}];


mongoSeedFaker(seedData, dbUri, dbName);