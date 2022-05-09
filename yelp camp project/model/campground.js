const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review')


const campgroundSchema = new Schema({
    location:String,
    title:String,
    image:String,
    price:Number,
    description:String,
    reviews : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
}) 

campgroundSchema.post('findOneAndDelete' ,async function(data){
    if(data)
    {
        await Review.deleteMany({
            id: { $in : data.reviews}
        })
    }
})

module.exports = mongoose.model('campground', campgroundSchema);