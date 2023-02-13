import React from "react";

function Product(props) {
  return (
    <div className="product">
      <h2>{props.title}</h2>
      <p>Price: ${props.model}</p>
    </div>
  );
}

export default Product;
