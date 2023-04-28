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
      return_url: "http://localhost:3000/paymentSuccess",
      cancel_url: "http://localhost:3000/paymentFail",
    },
    transactions: [
      {
        amount: {
          total: req.query.total,
          currency: "USD",
        },
        description: req.query.description,
        item_list: {
          // Thêm item_list vào đây
          items: [
            {
              name: req.query.description, // Tên mục hàng
              quantity: 1, // Số lượng
              price: req.query.total, // Giá tiền của mục hàng
              currency: "USD", // Đơn vị tiền tệ
            },
            // Có thể thêm nhiều mục hàng khác vào đây
          ],
        },
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
  const paymentId = req.body.paymentId;
  const payerId = req.body.PayerID;

  const paymentExecution = {
    payer_id: payerId,
  };

  paypal.payment.execute(paymentId, paymentExecution, (error, payment) => {
    if (error) {
      console.error(error);
      // Xử lý lỗi khi không thể lấy thông tin thanh toán
      // ...
    } else {
      // Đã lấy được thông tin thanh toán thành công
      console.log("Thông tin thanh toán: ", payment);
      res.json(payment);
      // Lấy thông tin chi tiết về quá trình thanh toán từ đối tượng `payment`
      // ...
    }
  });
};

module.exports = {
  createPayment,
  executePayment,

};
