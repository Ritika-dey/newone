const mongoose=require("mongoose")
const DB=process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log("conection established")
}).catch((err)=>console.log(err));
