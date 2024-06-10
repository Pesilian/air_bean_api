import { menuDb } from '../config/db.js';

//Get meny
async function getMenu(req, res) {
  try {
    const menu = await menuDb.find();

    if (menu.length === 0) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    res.status(200).json({ menuCount: menu.length, menu: menu });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get menu' });
  }
}

// "POST"/cart Funktion för att lägga till i meny
async function addToMenu(req, res) {
  const { title, price, desc, preptime } = req.body;

  try {
    const newItem = {
      title,
      price,
      desc,
      preptime,
      createdAt: new Date(),
    };
    const addedItem = await menuDb.insert(newItem);

    res.status(201).json({
      ItemId: addedItem._id,
      Item: newItem,
      message: 'Menu item added successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add' });
  }
}

// "DELETE"/cart Funktion för att ta bort en artikel från kundvagnen
async function removeFromMenu(req, res) {
  const { itemId } = req.body;

  try {
    let menuItem = await menuDb.findOne({ _id: itemId });

    if (!menuItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await menuDb.deleteOne({ _id: itemId });

    const response = {
      itemId: itemId,
      message: 'Item removed from cart successfully',
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to remove item from menu' });
  }
}

export { getMenu, addToMenu, removeFromMenu };
