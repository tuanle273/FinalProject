import React, { useContext, useState } from "react";
import { DiscountContext } from "../../../contexts/DiscountContext";

const CheckDiscountForm = () => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(null);
  const [message, setMessage] = useState("");
  const { checkDiscount } = useContext(DiscountContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await checkDiscount(code);
      const discount = response.data;
      setDiscount(discount);
      setMessage(
        `Discount found: ${discount.name} (${discount.amount * 100}% off)`
      );
    } catch (error) {
      setDiscount(null);
      setMessage("Discount code not found.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="discount-code">Discount code:</label>
      <input
        type="text"
        id="discount-code"
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />
      <button type="submit">Check discount</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CheckDiscountForm;
