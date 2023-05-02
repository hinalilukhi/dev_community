const mongoose=require("mongoose")


const connectdB= async() =>{
    try{
        await mongoose.connect(process.env.mongoURI);
        console.log('MongoDB connected..');
    }catch(err){
        console.log(err.message);
        process.exit(1)
    }
}
module.exports=connectdB