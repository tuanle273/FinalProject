const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", // change to 'live' for production
  client_id: process.env.CLIENT_ID_PAYPAL,
  client_secret: process.env.CLIENT_SECRET_PAYPAL,
});

const createPayment = (req, res) => {
  const paymentData = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    },
    transactions: [
      {
        amount: {
          total: "10.00",
          currency: "USD",
        },
        description: "Example transaction",
      },
    ],
  };

  paypal.payment.create(paymentData, (error, payment) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
};

const executePayment = (req, res) => {
  const paymentId = req.query.paymentId;
  const payerId = { payer_id: req.query.PayerID };

  paypal.payment.execute(paymentId, payerId, (error, payment) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      console.log(payment);
      res.sendStatus(200);
    }
  });
};

module.exports = {
  createPayment,
  executePayment,
};
