import mongoose from 'mongoose';
  

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    classname:{
        type:String,
        required:true
    },
   
    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        required:true
    },
    password:{
type:String,
required:true,
minilength:6
    },
   role:{
        type:String,
        enum:['admin','user','peon'],
        default:'user'
    },
},{timestamps:true});

const UserModel=mongoose.model('user',UserSchema)
export default UserModel;