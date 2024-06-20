import { productsDb } from '../config/db.js';

async function getProducts(req, res) {
  try {
    const products = await productsDb.find();

    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found' });
    }

    res
      .status(200)
      .json({ productsCount: products.length, products: products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get products' });
  }
}

// "POST"/cart Funktion för att lägga till i meny
async function addProducts(req, res) {
  const { title, price, desc, preptime } = req.body;

  try {
    const newItem = {
      title,
      price,
      desc,
      preptime,
      createdAt: new Date(),
    };
    const addedItem = await productsDb.insert(newItem);

    res.status(201).json({
      ItemId: addedItem._id,
      Item: newItem,
      message: 'Product added successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add' });
  }
}

// "DELETE"/cart Funktion för att ta bort en artikel från kundvagnen
async function removeProducts(req, res) {
  const itemId = req.params.itemId;

  try {
    let product = await productsDb.findOne({ _id: itemId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await productsDb.deleteOne({ _id: itemId });

    const response = {
      ProductId: itemId,
      message: 'Product removed from cart successfully',
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to remove product from menu' });
  }
}

//Redigera meny-item
async function editProducts(req, res) {
  const itemId = req.params.itemId;
  const { title, price, desc, preptime } = req.body;

  try {
    let product = await productsDb.findOne({ _id: itemId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const updatedFields = { modifiedAt: new Date() };
    if (title) updatedFields.title = title;
    if (price) updatedFields.price = price;
    if (desc) updatedFields.desc = desc;
    if (preptime) updatedFields.preptime = preptime;

    await productsDb.updateOne({ _id: itemId }, { $set: updatedFields });

    const response = {
      itemId: itemId,
      updatedFields: updatedFields,
      message: 'Product updated successfully',
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to update product' });
  }
}

export { getProducts, addProducts, removeProducts, editProducts };
