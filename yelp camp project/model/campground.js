const mongoose =  require('mongoose');
const Schema = mongoose.Schema;


const campgroundSchema = new Schema({
    location:String,
    title:String,
    image:String,
    price:Number,
    description:String,
    review : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
}) 


module.exports = mongoose.model('camground', campgroundSchema);