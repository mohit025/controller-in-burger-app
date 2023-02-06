const express=require('express')
const app=express()
const mongoose=require('mongoose')
const Burger=require('./model/burger')
const methodOverride = require('method-override')
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs')
app.use(express.static("public"))
app.use(methodOverride('_method'))
const url="mongodb://127.0.0.1:27017/Burgerapp"

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    if(err)
    console.log("Not connected");
    else
    console.log("Connected");
});

// app.get('/' , (req,res)=>{
//     Burger.find()
//     .then((data)=>{
//         res.render("index",{title:"Home", orders:data})
//     })
//     .catch((err)=>{
//     console.log(err);})
// })
app.get('/', async (req,res)=>{
    const burgers=await Burger.find({});
    res.render('index',{'title':'Home',burgers})
})

app.get('/about', (req,res)=>{
   res.render('about',{'title':'About'})
})

app.get('/orders', (req,res)=>{
    res.render('order',{'title':'Order'})
})
app.post('/orders', async (req,res)=>{
const burger= await new Burger(req.body)
burger.save()
    .then(()=>{
        res.redirect('/')
        console.log("Successfully placed order");
    })
 .catch((err)=>{
    console.log("Error while ordering");
 })
})

// app.get('/orders/:id', async(req,res)=>{
//     const {id} = req.params;
//     const burger = await Burger.findById(id);
//     res.render('show' , {burger});
// })

app.get('/products/:id', async(req,res)=>{
    const {id} = req.params;
    
    const burger = await Burger.findById(id);
    res.render('show' , {burger})
})



app.get('/:id/edit', async(req,res)=>{
    const burger= await Burger.findById(req.params.id);
    res.render('edit',{burger});
})



app.patch('/products/:id', async(req, res) => {
        
    await Burger.findByIdAndUpdate(req.params.id, req.body);

    res.redirect(`/products/${req.params.id}`);
})


app.delete('/products/:id', async(req, res) => {
    await Burger.findByIdAndDelete(req.params.id);
    res.redirect('/products');
    // res.redirect('back');
    
    });



app.use((req,res)=>{
    res.render('404')
})
app.listen(3010,()=>{
    console.log("Server running at port 3010");
})
