const mongoose=require('mongoose');

const empSchema=mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    age:{
        type:Number
    },
    phone:{
        type:String
    },
    salary:{
        type:Number
    },
    password:{
        type:String
    },
})
const empModel=mongoose.model('employee',empSchema)
module.exports=empModel