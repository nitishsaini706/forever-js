
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
        let price = Math.floor(Math.random() * 20) + 10
        const camp = new campground(
            {
                location: `${cities[random1000].city},${cities[random1000].state}`,
                title: `${descriptors[sample(descriptors)]} ${places[sample(places)]}`,
                image: 'https://unsplash.com/collections/483251/in-the-woods',
                description: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur officiis eos ipsam commodi, quaerat, quam provident temporibus cum eaque ea sit optio sequi laboriosam. Minus cumque qui iure repudiandae aliquam.',
                price
            }
        )

        await camp.save();
    }
}


seedDb().then(() => {
    mongoose.connection.close();
})