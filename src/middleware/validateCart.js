// Middleware för att validera när man lägger till nåt i kunvagnen
function validateCart(req, res, next) {
  const { title, price } = req.body;
  if (!title || !price) {
    return res.status(400).json({ error: 'Title and price are required' });
  }
  next();
}

export { validateCart };
