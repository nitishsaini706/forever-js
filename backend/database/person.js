const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/movieApp');
  console.log('working');
}

const personSchema = new mongoose.Schema({
    first:String,
    last:String
})

//function present in mongoose but not in db
personSchema.virtual('fulName').get(function(){
    return `${this.first} ${this.last}`
})

const person = mongoose.model('person',personSchema);
const nitish = new person({first:"nitish",last:"saini"});
nitish.save();
console.log(nitish.fulName);
console.log(nitish);
