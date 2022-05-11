const bcrypt = require('bcrypt');

// const salt = async (pw) => {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(pw,salt);
// }

const salt = async (pw) => {
    //use inbilt salt 
    const hash = await bcrypt.hash(pw,10);
    console.log(hash);
}


const login = async (pw,hashpw)=>{
    const result = await bcrypt.compare(pw,hashpw);
    if(result)
    {
        console.log("Logged in");
    }
    else{
        console.log("Intruder");
    }
}
// salt('pas');
login('pas','$2b$10$Ad.2sa6iD.vKSQHIo6fd3.FuKJ4lXKipL4rrS2sU/APX71oWSWhBG');
