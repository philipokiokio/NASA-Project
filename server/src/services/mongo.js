const mongoose = require('mongoose');


const MONGO_URL = 'mongodb+srv://nasa-api:ztmnodejs2022@cluster0.jsdrj.mongodb.net/NASA?retryWrites=true&w=majority'

mongoose.connection.once('open',()=>{
    console.log("MongoDB connection ready");
});

mongoose.connection.on('error', (err)=>{
    console.error(err);
})



async function mongoConnect(){
   await mongoose.connect(MONGO_URL,{
    });
}

async function mongoDisconnect(){

    await mongoose.disconnect(MONGO_URL,{});
};


module.exports = {
    mongoConnect,
    mongoDisconnect
}