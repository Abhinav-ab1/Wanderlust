const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect(mongo_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "69d0b8c424f6c3b878f23734"}));
    await Listing.insertMany(initData.data);
    console.log("Data initialized");
}

initDB();