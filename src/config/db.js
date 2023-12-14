const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;


mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected To Database')
}).catch((e) => {
    console.log(e);
})