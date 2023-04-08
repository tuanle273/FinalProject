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

module.exports = {
  createPayment,
};
