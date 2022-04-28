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

//using middelwares
//this will run pre save
personSchema.pre('save',async function () {
    console.log('ABOUT TO SAVE!!!!');
}) 

// this will run post save
personSchema.post('save',async function(){
    console.log("SAVED");
})

const person = mongoose.model('person',personSchema);
const nitish = new person({first:"nitish",last:"saini"});
nitish.save();
console.log(nitish.fulName);
console.log(nitish);
