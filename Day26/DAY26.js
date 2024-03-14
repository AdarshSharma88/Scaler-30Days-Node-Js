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
      const productCollection = productModel.collection;
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
async function getProductStatistics() {
    try {
      const result = await Product.aggregate([
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            averagePrice: { $avg: '$price' },
            highestQuantity: { $max: '$quantity' } // Assuming you have a quantity field in your product schema
          }
        }
      ]);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('Error calculating product statistics:', error.message);
      throw error;
    }
  }
  app.get('/product-statistics', async (req, res) => {
    try {
      const statistics = await getProductStatistics();
      res.json(statistics);
    } catch (error) {
      console.error('Error fetching product statistics:', error.message);
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
