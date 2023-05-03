const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const createPayment = async (req, res) => {
  try {
    // Create a price with the given amount and description
    const price = await stripe.prices.create({
      unit_amount: req.query.total, // the price amount in cents
      currency: "usd", // the currency of the price
      product_data: {
        name: req.query.description,
      },
    });

    // Create a checkout session with the created price
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",

      success_url: `http://localhost:3000/paymentSuccess`,
      cancel_url: `http://localhost:3000/paymentFail`,
    });

    // Redirect the user to the checkout page
    res.redirect(303, session.url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating payment session" });
  }
};
const getAllTransactions = async (req, res) => {
  try {
    const paymentIntents = await stripe.paymentIntents.list();

    res.status(200).json(paymentIntents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting payment intents" });
  }
};

module.exports = {
  createPayment,
  getAllTransactions,
};
