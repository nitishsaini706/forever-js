const mongoose = require('mongoose');
const passportlocal = require('passport-local-mongoose');

const userSchema = mongoose.Schema ({
    email : {
        type:String,
        required:true,
        unique:true
    }
})

userSchema.plugin(passportlocal);

module.exports = mongoose.model('user',userSchema);