const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const createPayment = async (req, res) => {
  const { priceId } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1MoSFSAIZ2hFgEmPTkvDcrcL",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",
  });

  res.json({ sessionId: session.id });
};

module.exports = {
  createPayment,
};
