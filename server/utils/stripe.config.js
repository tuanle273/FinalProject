const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const createPayment = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: "60000000",
      currency: "USD",
      payment_method_types: ["card"],
    });
    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error creating payment intent" });
  }
};

module.exports = {
  createPayment,
};
