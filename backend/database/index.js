const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/movieApp');
  console.log('working');
}

const movieSchema = new mongoose.Schema({
    title:String,
    year:Number,
    score:Number,
    rating:String
});

const Movie = mongoose.model('Movie',movieSchema);
const lucifer = new Movie({title:'lucifer',year:2000,score:9.2,raing:'R'})
