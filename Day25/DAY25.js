const express = require('express');
const mongoose = require('mongoose');
const connectToMongoDB = require('../Day16/connection.js');

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

app.post('/products', async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const product = await Product.create({ name, price, category });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
async function createProductNameIndex() {
    try {
      const productModel = mongoose.model('Product');
      const productCollection = productModel.collection;ou
      await productCollection.createIndex({ name: 1 });
  
      console.log('Index on "name" field created successfully.');
    } catch (error) {
      console.error('Error creating index on "name" field:', error.message);
      throw error;
    }
  }
  
  createProductNameIndex();
app.get('/products', async (req, res) => {
  try {
    const products = await getProductsPopulatedWithCategory();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      mongoose.Types.ObjectId(id), // Convert id to ObjectId
      { name, price, category },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
