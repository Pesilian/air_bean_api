// Middleware för att validera när man lägger till nåt i kunvagnen
function validateProduct(req, res, next) {
  const { title, price, desc, preptime } = req.body;
  if (!title || !price || !desc || !preptime) {
    return res
      .status(400)
      .json({ error: 'Product must include title, prize, desc and preptime' });
  }
  next();
}

export { validateProduct };
