import nedb from 'nedb-promises';

const cartDb = new nedb({ filename: 'cart.db', autoload: true });
const orderDb = new nedb({ filename: 'orders.db', autoload: true });
const userDb = new nedb({ filename: 'users.db', autoload: true });
const productsDb = new nedb({ filename: 'products.db', autoload: true });
const campaignsDb = new nedb({ filename: 'campaign.db', autoload: true });

export { cartDb, orderDb, userDb, productsDb, campaignsDb };
