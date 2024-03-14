const mongoose = require('mongoose');
const connectToMongoDB = require('../Day16/connection.js');
const express = require('express');
const app = express();
app.use(express.json());
connectToMongoDB();

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
});

const Category = mongoose.model('Category', categorySchema);

const Product = mongoose.model('Product', productSchema);


async function getProductsPopulatedWithCategory() {
  try {
    
    const productsWithCategory = await Product.find().populate('category').exec();

    return productsWithCategory;
  } catch (error) {
    console.error('Error fetching products with category details:', error.message);
    throw error;
  }
}
async function test() {
  try {
    const category = await Category.create({ name: 'Electronics', description: 'Electronic products' });

    await Product.create({ name: 'Laptop', price: 999, category: category._id });
    const productsWithCategory = await getProductsPopulatedWithCategory();
    
    console.log(productsWithCategory);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

// Run the test
test();
