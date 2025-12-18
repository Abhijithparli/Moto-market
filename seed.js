const express = require('express');
const app = express();
const Product = require('./models/product');
const mongoose = require('mongoose');
const product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/shopDB')
.then(()=> console.log('connected for seeding'))
.catch((err)=> console.log(err));

//data we want to insert in 

const seedProducts = [
    {name:'AGV Pista GP RR',price:1400,category:'Racing',stock:5},
    { name: 'Shoei RF-1400', price: 550, category: 'Street', stock: 20 },
  { name: 'Bell Qualifier', price: 120, category: 'Street', stock: 50 },
  { name: 'Fox Racing V1', price: 200, category: 'Off-Road', stock: 15 },
  { name: 'Arai Corsair-X', price: 900, category: 'Racing', stock: 8 },
  { name: 'HJC i10', price: 150, category: 'Street', stock: 30 },
  { name: 'LS2 Stream', price: 100, category: 'Touring', stock: 25 },
  { name: 'Shark Evo', price: 450, category: 'Modular', stock: 12 },
  { name: 'Giro Fixture', price: 50, category: 'Bicycle', stock: 100 },
  { name: 'Trek Solstice', price: 40, category: 'Bicycle', stock: 60 }
];

const seedDB = async()=>{
    await Product.deleteMany({});

    await product.insertMany(seedProducts);

    console.log("data added sucessfully");
    mongoose.connection.close();
};
seedDB();



