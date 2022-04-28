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
// const lucifer = new Movie({title:'lucifer',year:2000,score:9.2,raing:'R'})

Movie.insertMany([
    {title:'lucifer',year:2000,score:9.2,raing:'R'},
    {title:'luci',year:2000,score:9.3,raing:'R'},
    {title:'fer',year:2000,score:9.4,raing:'U'},
    {title:'lfer',year:2000,score:8.2,raing:'A'},
    {title:'ucifer',year:2000,score:9.0,raing:'PG-13'}]
)
.then(data => {
    console.log("connectd");
    console.log(data);
})