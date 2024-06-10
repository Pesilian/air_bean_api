// "POST"/cart Funktion för att lägga till i meny
async function addToMenu(req, res) {
  const { title, price, preptime } = req.body;

  const menuItem = {
    title,
    desc,
    price,
    preptime,
  };

  try {
    await Db.update(menuItem);

    const response = {
      title: menuItem.title,
      price: menuItem.price,
      preptime: menuItem.preptime,
      message: 'Added to menu successfully',
    };

    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to add to cart' });
  }
}
