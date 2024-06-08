import { v4 as uuidv4 } from 'uuid';
import { cartDb } from '../config/db.js';
import { menu } from '../config/data.js';
import cartRouter from '../routes/carts.js';

//POST, Skapa upp Cart
async function addCart(req, res) {
  const Cart = { items: [] };

  try {
    const newCart = await cartDb.insert(Cart);

    res
      .status(201)
      .json({ cartId: newCart._id, message: 'Cart created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create cart' });
  }
}

// "POST"/cart Funktion för att lägga till i kundvagnen
async function addToCart(req, res) {
  const { title, price } = req.body;
  const cartId = req.params.cartId;

  let cart = await cartDb.findOne({ _id: cartId });

  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const product = menu.find(item => item.title === title);

  if (!product) {
    return res.status(400).json({ error: 'Product not found' });
  }

  if (product.price !== price) {
    return res.status(400).json({ error: 'Invalid price' });
  }

  const cartItem = { title, price, preptime: product.preptime };

  try {
    // Använd $push för att lägga till cartItem till items arrayen
    await cartDb.update({ _id: cartId }, { $push: { items: cartItem } });

    const response = {
      title: cartItem.title,
      price: cartItem.price,
      preptime: cartItem.preptime,
      message: 'Added to cart successfully',
    };

    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to add to cart' });
  }
}

// "GET"/cart varukorg
async function viewCart(req, res) {
  const cartId = req.params.cartId;

  try {
    const cart = await cartDb.findOne({ _id: cartId });

    console.log(cart);

    const totalPrice = cart.items.reduce(
      (total, cart) => total + cart.price,
      0
    );

    res.status(200).json({ cart, totalPrice });
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve cart' });
  }
}

// "DELETE"/cart/id Ta bort från kundvagnen
async function removeFromCart(req, res) {
  const { cartId } = req;
  try {
    const cartItem = await cartDb.findOne({ _id: req.params.title, cartId });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartDb.remove({ _id: req.params.id, cartId });

    res.status(200).json({ message: 'Cart item removed successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred', error: error.message });
  }
}

export { addCart, addToCart, viewCart, removeFromCart };
