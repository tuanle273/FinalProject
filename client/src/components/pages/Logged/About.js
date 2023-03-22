import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const CheckoutForm = () => {
  const [product, setProduct] = useState({
    name: "Product name",
    price: 10,
    description: "Product description",
  });

  const handleToken = async (token, addresses) => {
    const response = await fetch("/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: product.price * 100,
        currency: "USD",
        token,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <h3>{product.description}</h3>
      <h4>Price: ${product.price}</h4>
      <StripeCheckout
        stripeKey="pk_test_51MoGC4AIZ2hFgEmPwsXkHNgMRlaY2PyHcDsBXlpnSSZyz7P9eJc4WaNX1SDyhiZGsyqGSp2VVLoM0ECbFAn6MrIb00U6MJ0Vqi"
        token={handleToken}
        billingAddress
        shippingAddress
        amount={product.price * 100}
        name={product.name}
        description={product.description}
      />
    </div>
  );
};

export default CheckoutForm;
