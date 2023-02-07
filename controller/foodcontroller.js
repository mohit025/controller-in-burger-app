

const express = require('express');
const Burger = require('../model/burger');






module.exports.home = async (req, res) => {
    const burgers = await Burger.find({});
    res.render('index',{burgers});
}


module.exports.about = (req, res) => {
    res.render('about')
}

module.exports.orders = (req, res) => {
    res.render('order')
}

module.exports.show=async(req,res)=>{
        const {id} = req.params;
        const burger = await Burger.findById(id);
        res.render('show' , {burger});	
    }
module.exports.orderspost = async (req, res) => {
    const burger = await new Burger(req.body)
    burger.save()
        .then(() => {
            res.redirect('/')
            console.log("Successfully placed order");
        })
        .catch((err) => {
            console.log("Error while ordering");
        })
}
module.exports.productid=async(req,res)=>{
    const {id} = req.params;
    
    const burger = await Burger.findById(id);
    res.render('show' , {burger})
}
module.exports.myedit=async(req,res)=>{
    const burger= await Burger.findById(req.params.id);
    res.render('edit',{burger});
}



module.exports.mypatch=async(req, res) => {
        
    await Burger.findByIdAndUpdate(req.params.id, req.body);

    res.redirect(`/orders/products/${req.params.id}`);
}

module.exports.mydelete=async(req, res) => {
    await Burger.findByIdAndDelete(req.params.id);
    res.redirect('/products');
    // res.redirect('back');
    
    }




