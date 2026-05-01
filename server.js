const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.static(__dirname + '/public'));

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: process.env.PRICE_ID, quantity: 1 }],
      success_url: 'https://yoursite.com/success',
      cancel_url: 'https://yoursite.com',
    });
    res.redirect(303, session.url);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));