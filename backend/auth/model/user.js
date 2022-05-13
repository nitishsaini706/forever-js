const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: [true , "Username cannot be blank"]
    },
    password:{
        type:String,
        required:[true , "Password cannot be blank"]
    }
})

//middleware , here this refers to the current instance that is user

// userSchema.pre('save',async function(next)
// {
//     if(!this.modified) return next();
//     this.password = await bcrypt.hash(this.password,12);
//     next();
// })


// here this refers to the model of the schema 
// userSchema.statics.validate = async function (user,pass)
// {
//     const fuser = await findOne({username});
//     const validate = bcrypt.compare(fuser.password , pass);
//     return validate ? fuser : false;
// }

module.exports = mongoose.model('username',userSchema);