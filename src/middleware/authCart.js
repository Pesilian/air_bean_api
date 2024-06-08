import { v4 as uuidv4 } from 'uuid';

// Middleware för att kontrollera eller skapa varukorgens ID
function checkCartId(req, res, next) {
  let cartId = req.headers['cart-id'];

  if (!cartId) {
    cartId = uuidv4();
    req.headers['cart-id'] = cartId;
  }

  req.cartId = cartId;
  next();
}

export { checkCartId };
