import { cartDb, orderDb, campaignsDb } from '../config/db.js';

//CREATE ORDER AS GUEST
async function createguestOrder(req, res) {
  try {
    const cartId = req.params.cartId;

    const cart = await cartDb.findOne({ _id: cartId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderTime = new Date();
    const maxPreparationTime = Math.max(
      ...cart.items.map(item => item.preptime)
    );
    const deliveryTime = new Date(
      orderTime.getTime() + maxPreparationTime * 60000
    );

    const campaigns = await campaignsDb.find();
    let applicableCampaign = null;
    let campaignItems = [];
    let otherItems = [...cart.items];

    for (const campaign of campaigns) {
      const campaignProductTitles = campaign.Products.map(
        product => product.title
      );
      const cartProductTitles = cart.items.map(item => item.title);

      // Kontrollera om alla kampanjprodukter finns i varukorgen
      if (
        campaignProductTitles.every(title => cartProductTitles.includes(title))
      ) {
        applicableCampaign = campaign;
        break;
      }
    }

    if (applicableCampaign) {
      const campaignProductTitles = applicableCampaign.Products.map(
        product => product.title
      );
      const campaignProductCount = {};

      for (const title of campaignProductTitles) {
        campaignProductCount[title] = (campaignProductCount[title] || 0) + 1;
      }

      // Lägga till kampanjprodukterna i campaignItems
      for (const item of cart.items) {
        if (
          campaignProductTitles.includes(item.title) &&
          campaignProductCount[item.title] > 0
        ) {
          campaignItems.push(item);
          campaignProductCount[item.title]--;
          // Ta bort produkten från otherItems
          otherItems = otherItems.filter(otherItem => otherItem !== item);
        }
      }

      campaignItems = campaignItems.slice(0, campaignProductTitles.length);
    }

    const otherItemsTotalPrice = otherItems.reduce(
      (total, item) => total + item.price,
      0
    );
    const totalPrice =
      (applicableCampaign ? applicableCampaign.price : 0) +
      otherItemsTotalPrice;

    const order = {
      items: {
        campaign: campaignItems.length
          ? {
              title: applicableCampaign.title,
              items: campaignItems,
              price: applicableCampaign.price,
            }
          : null,
        others: otherItems,
      },
      totalPrice,
      deliveryTime,
      createdAt: new Date(),
    };

    await orderDb.insert(order);
    await cartDb.remove({ _id: cartId });

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

//CREATE ORDER AS USER
async function createOrder(req, res) {
  try {
    const cartId = req.params.cartId;

    const cart = await cartDb.findOne({ _id: cartId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderTime = new Date();
    const maxPreparationTime = Math.max(
      ...cart.items.map(item => item.preptime)
    );
    const deliveryTime = new Date(
      orderTime.getTime() + maxPreparationTime * 60000
    );

    const campaigns = await campaignsDb.find();
    let applicableCampaign = null;
    let campaignItems = [];
    let otherItems = [...cart.items];

    for (const campaign of campaigns) {
      const campaignProductTitles = campaign.Products.map(
        product => product.title
      );
      const cartProductTitles = cart.items.map(item => item.title);

      if (
        campaignProductTitles.every(title => cartProductTitles.includes(title))
      ) {
        applicableCampaign = campaign;
        break;
      }
    }

    if (applicableCampaign) {
      const campaignProductTitles = applicableCampaign.Products.map(
        product => product.title
      );
      const campaignProductCount = {};

      for (const title of campaignProductTitles) {
        campaignProductCount[title] = (campaignProductCount[title] || 0) + 1;
      }

      for (const item of cart.items) {
        if (
          campaignProductTitles.includes(item.title) &&
          campaignProductCount[item.title] > 0
        ) {
          campaignItems.push(item);
          campaignProductCount[item.title]--;
          // Ta bort produkten från otherItems
          otherItems = otherItems.filter(otherItem => otherItem !== item);
        }
      }

      campaignItems = campaignItems.slice(0, campaignProductTitles.length);
    }

    const otherItemsTotalPrice = otherItems.reduce(
      (total, item) => total + item.price,
      0
    );
    const totalPrice =
      (applicableCampaign ? applicableCampaign.price : 0) +
      otherItemsTotalPrice;

    const user = req.user;
    const order = {
      items: {
        campaign: campaignItems.length
          ? {
              title: applicableCampaign.title,
              items: campaignItems,
              price: applicableCampaign.price,
            }
          : null,
        others: otherItems,
      },
      userId: user._id,
      totalPrice,
      deliveryTime,
      createdAt: new Date(),
    };

    await orderDb.insert(order);
    await cartDb.remove({ _id: cartId });

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
