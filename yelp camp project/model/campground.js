const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review')


const campgroundSchema = new Schema({
    location:String,
    title:String,
    images:[{
        url:String,
        filename:String
    }],
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
    price:Number,
    description:String,
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
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