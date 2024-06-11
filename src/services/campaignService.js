import { productsDb, campaignsDb } from '../config/db.js';

//ADD CAMPAIGN
async function newCampaign(req, res) {
  const { title, price, duration } = req.body;
  const Campaign = { title, Products: [], price, duration };

  try {
    const newCampaign = await campaignsDb.insert(Campaign);

    res.status(201).json({
      Campaign: newCampaign.title,
      message: 'Campaign created successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create campaign' });
  }
}

//ADD PRODUCTS TO CAMPAIGN
async function addCampaignProducts(req, res) {
  const { title } = req.body;
  const campaignTitle = req.params.campaignTitle;

  let newCampaign = await campaignsDb.findOne({ title: campaignTitle });

  if (!newCampaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  const product = await productsDb.findOne({ title: title });

  if (!product) {
    return res.status(400).json({ error: 'Product not found' });
  }

  const campaignItem = {
    title,
  };
  try {
    await campaignsDb.update(
      { title: campaignTitle },
      { $push: { Products: campaignItem } }
    );

    const response = {
      message: 'Added to campaign successfully',
    };

    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to add to campaign' });
  }
}

//DELETE CAMPAIGN
async function removeCampaign(req, res) {
  const campaignTitle = req.params.campaignTitle;

  try {
    let product = await campaignsDb.findOne({ title: campaignTitle });

    if (!product) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    await campaignsDb.deleteOne({ title: campaignTitle });

    const response = {
      title: campaignTitle,
      message: 'Campaign removed from cart successfully',
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to remove campaign' });
  }
}

export { newCampaign, addCampaignProducts, removeCampaign };
