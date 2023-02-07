const express=require('express')
const app=express()
const mongoose=require('mongoose')
const Burger=require('./model/burger')
const methodOverride = require('method-override')
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs')
app.use(express.static("public"))
app.use(methodOverride('_method'))
const baseroute=require('./routes/index');


mongoose.connect('mongodb://127.0.0.1:27017/Burgerapp2', {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log("DB connected");
})
.catch(err=>{
    console.log("error in connecting to DB");
    console.log(err);
});

app.use(baseroute);

app.use((req,res)=>{
    res.render('404')
})
app.listen(3010,()=>{
    console.log("Server running at port 3010");
})
