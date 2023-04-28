const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const createPayment = async (req, res) => {
  const { amount } = req.body;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1MtwkwAIZ2hFgEmPwyKD5Vgp",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/login`,
    cancel_url: `http://localhost:3000/login`,
  });

  res.redirect(303, session.url);
};
const getAllTransactions = async (req, res) => {
  try {
    const paymentIntents = await stripe.paymentIntents.list();

    // Log the payment intents to the console
    console.log(paymentIntents);

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
