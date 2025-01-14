import mongoose from 'mongoose';
const db =async ()=>{
    try{
        const mongoURI=process.env.MONGO_URI;
        await mongoose.connect(mongoURI)
        console.log("connected to Mongodb")
    }
    catch(error){
console.log("Error connnecting to MongoDb:",error.message)
    }
  
}
export default db;