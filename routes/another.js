const express = require('express');
const router = express.Router();
const Burger=require('../model/burger');

const mycontrol = require('../controller/foodcontroller');

// /orders/home

router.get('/home', mycontrol.home);

router.get('/about' , mycontrol.about);

router.get('/' , mycontrol.orders);
router.post('/' , mycontrol.orderspost);
router.get('/products/:id' , mycontrol.productid);
router.get('/:id',mycontrol.show);
router.get('/:id/edit' , mycontrol.myedit);

router.patch('/products/:id' , mycontrol.mypatch);
router.delete('/products/:id' , mycontrol.mydelete);

module.exports = router;