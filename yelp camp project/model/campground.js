const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    location:String,
    title:String,
    image:String,
    price:Number,
    description:String,
    reviews:String
}) 


module.exports = mongoose.model('camground', campgroundSchema);