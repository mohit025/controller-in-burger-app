const express = require('express');

const router = express.Router();

const mycontrol = require('../controller/foodcontroller');
const myproduct=require('./another');

router.get('/', mycontrol.home);

router.use('/orders', myproduct);


module.exports = router;