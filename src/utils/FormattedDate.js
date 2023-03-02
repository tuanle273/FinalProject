import React from "react";

const FormattedDate = ({ date }) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    new Date(date)
  );
  return <div>{formattedDate}</div>;
};

export default FormattedDate;
