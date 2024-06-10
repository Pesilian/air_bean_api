import { cartDb, orderDb } from '../config/db.js';

//ORDER AS GUEST
async function createguestOrder(req, res) {
  try {
    const cartId = req.params.cartId;

    const cart = await cartDb.findOne({ _id: cartId });
    if (cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalPrice = cart.items.reduce(
      (total, cart) => total + cart.price,
      0
    );

    const orderTime = new Date();
    const maxPreparationTime = Math.max(
      ...cart.items.map(item => item.preptime)
    );

    const deliveryTime = new Date(
      orderTime.getTime() + maxPreparationTime * 60000
    );

    const order = {
      items: cart,
      totalPrice,
      deliveryTime,
      createdAt: new Date(),
    };

    await orderDb.insert(order);

    await cartDb.remove({}, { multi: true });

    res.status(201).json({
      items: order.items,
      totalPrice: order.totalPrice,
      delivery: order.deliveryTime,
      message: 'Order created successfully',
      orderId: order._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create order', error: error.message });
  }
}

//ORDER AS USER
async function createOrder(req, res) {
  try {
    const cartId = req.params.cartId;

    const cart = await cartDb.findOne({ _id: cartId });
    if (cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalPrice = cart.items.reduce(
      (total, cart) => total + cart.price,
      0
    );

    const orderTime = new Date();
    const maxPreparationTime = Math.max(
      ...cart.items.map(item => item.preptime)
    );

    const deliveryTime = new Date(
      orderTime.getTime() + maxPreparationTime * 60000
    );

    const user = req.user;
    const order = {
      items: cart,
      totalPrice,
      deliveryTime,
      createdAt: new Date(),
      userId: user.id,
    };

    await orderDb.insert(order);

    await cartDb.remove({}, { multi: true });

    res.status(201).json({
      items: order.items,
      totalPrice: order.totalPrice,
      delivery: order.deliveryTime,
      message: 'Order created successfully',
      orderId: order._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create order', error: error.message });
  }
}

//SHOW ORDER STATUS
async function getOrderById(req, res) {
  try {
    const orderId = req.params.orderId;

    const order = await orderDb.findOne({ _id: orderId });

    const currentTime = new Date();
    const deliveryTime = new Date(order.deliveryTime);
    const isDelivered = deliveryTime <= currentTime;

    let timeLeft = null;
    if (!isDelivered) {
      const timeDiff = deliveryTime - currentTime;
      const minutesLeft = Math.floor(timeDiff / 60000);

      const secondsLeft = Math.floor((timeDiff % 60000) / 1000);
      timeLeft = `${minutesLeft} minutes and ${secondsLeft} seconds`;
    }

    const orderWithDeliveryStatus = {
      ...order,
      isDelivered,
      timeLeft: isDelivered ? null : timeLeft,
    };

    res.status(200).json({ orderWithDeliveryStatus });
  } catch (error) {
    res.status(400).json({ error: 'Failed to get order' });
  }
}

export { createOrder, createguestOrder, getOrderById };
