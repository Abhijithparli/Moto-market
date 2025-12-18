//connect to mongodb

// const { log } = require("console");
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');
const product = require('./models/product');
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/shopDB')
.then(()=> console.log('connected to mongodb'))
.catch((err)=> console.log('connection failed:',err));


// GET /api/products with Search, Filter, Sort & Pagination
app.get('/api/products', async (req, res) => {
  try {
    // 1. Grab parameters (added page & limit)
    const { search, category, sort, page = 1, limit = 10 } = req.query;

    // 2. Build the Search/Filter query
    let dbQuery = {};
    if (search) dbQuery.name = new RegExp(search, 'i');
    if (category) dbQuery.category = category;

    // 3. Build the Sort query
    let sortQuery = {};
    if (sort === 'price_asc') sortQuery = { price: 1 };
    else if (sort === 'price_desc') sortQuery = { price: -1 };
    else if (sort === 'name') sortQuery = { name: 1 };

    // 4. Pagination Math
    // Convert strings to numbers (e.g., "5" -> 5)
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // 5. Find, Sort, Skip, Limit
    const products = await Product.find(dbQuery)
      .sort(sortQuery)
      .skip(skip)
      .limit(limitNum);

    // Optional: Send total count so frontend knows how many pages exist
    const total = await Product.countDocuments(dbQuery);

    res.json({ products, total, page: pageNum, pages: Math.ceil(total / limitNum) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});


const PORT = 9000;
app.listen(PORT,()=>{
    console.log(`serverr id running in port localhost${PORT}`);
});