const mongoose=require('mongoose')
const burgerSc=new mongoose.Schema({
    name:{
        type:String, required:true
    },
    burger:{
        type:String,required:true
    },
    location:{
        type:String,required:true   
    }
},{timestamps:true});
const Burger=mongoose.model('Burger',burgerSc);
module.exports=Burger;