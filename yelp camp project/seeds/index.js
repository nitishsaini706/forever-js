
const mongoose = require('mongoose');
const campground = require('../model/campground');
const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers');


main().catch(err => { console.log(err) })
async function main() {
    await mongoose.connect('mongodb://localhost:27017/camp', {
        useNewUrlParser: true,
        // useCreateIndex : true,
        UseUnifiedTopology: true
    });
    console.log("Db workkiing");
}

const sample = array => Math.floor(Math.random() * array.length);

const seedDb = async () => {
    await campground.deleteMany({});
    for (let i = 1; i <= 50; i++) {
        let random1000 = Math.floor(Math.random() * 1000);
        // let price = Math.floor(Math.random() * 20) + 10
        const camp = new campground(
            {
                location: `${cities[random1000].city},${cities[random1000].state}`,
                title: `${descriptors[sample(descriptors)]} ${places[sample(places)]}`,
                image: 'https://images.unsplash.com/photo-1437205695086-b44352699f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHw0ODQzNTF8fHx8fHx8MTY1MTQ2NTUwMw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200&h=200',
                description: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur officiis eos ipsam commodi, quaerat, quam provident temporibus cum eaque ea sit optio sequi laboriosam. Minus cumque qui iure repudiandae aliquam.',
                price: 10
            }
        )

        await camp.save();
    }
}


seedDb().then(() => {
    mongoose.connection.close();
})