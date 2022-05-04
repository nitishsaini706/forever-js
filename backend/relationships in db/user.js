const mongoose = require('mongoose');

main().catch(e => console.log("error occured" , e));

async function main()
{

    await mongoose.connect('mongodb://localhost:27017/relationshipDemo' , {useNewUrlParser:true , useUnifiedTopology:true});
    console.log("db connected");

}

const userSchema = mongoose.Schema({

    first:String,
    last:String,
    addresses : [
        {
            _id:{id:false},
            street:String,
            city:String,
            country:String
        }
    ]

    //in sql for addresses we have to create separate table and connect it for first and last name
    // in mongoose we create it within one schema and mongoose will create separate schema for it automatically wit separate id
    // how ever to not create id separately for new addresses we set id as false
})

const User = mongoose.model('user',userSchema);

// this approach is one to few , we can store only for few options and not for large dastaset

const makeUser = async () => {
    const u = new User(
    {
    first: 'Harry',
    last:'puttar'
    })
    u.addresses.push({
        street:'h.no 126',
        city:'Gama Ghugiya vala',
        country:'saiwalo g'
    })

    const res = await u.save()
    console.log(res);

}

const updateAddr = async (id) => {
    
    const user = await User.findById(id);

    user.addresses.push({
        street:'h.no 102',
        city:'Surrey',
        country:'Pake canada vale'
    })

    const res = await user.save();
    console.log(res);
}
 
updateAddr("6271f0cf43d6a0a89e3bd9e3");