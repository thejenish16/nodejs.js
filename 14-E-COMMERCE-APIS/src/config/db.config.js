const mongoose=require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongoDB is Conncted...");
}).catch((err)=>{
    console.log("mongoDB is Faieled...",err);
    
});