const mongoose = require('mongoose');

main().catch(e => console.log("error occured" , e));

async function main()
{

    await mongoose.connect('mongodb://localhost:27017/relationshipDemo' , {useNewUrlParser:true , useUnifiedTopology:true});
    console.log("db connected");

}

// one to bijilions , with thousands of docuemnts ,it's more efficient to store a reference to the parent on the child docuement


const userSchema = new mongoose.Schema({
    username:String,
    age:Number
})

const tweetSchema = new mongoose.Schema({
    tweet:String,
    likes:Number,
    user: [{type:mongoose.Schema.Types.ObjectId ,ref:'User'}]
})

const User = mongoose.model('User',userSchema);

const Tweet = mongoose.model('tweet',tweetSchema);

// const maketweet = async (id)=>
// {
//     // const user = new User({name:'nitish',age:'21'})
//     const user = await User.findById(id);
//     // console.log(user);
//     const tweet2= new Tweet({tweet:'learning express',likes:'200'})
//     tweet2.user = user ;
//     // user.save();
//     tweet2.save();
// }

// maketweet("627203e978f5f2dcbe1d6789");

const findTweet= async() =>{
    const t = await Tweet.find({}).populate('user');
    console.log(t);
}

findTweet();