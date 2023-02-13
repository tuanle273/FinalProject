import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

export default function HomePage() {
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);

  useEffect(() => {
    setisLoading(true);
    axios
      .get("http://localhost:5000/api/vehicle")
      .then((response) => {
        setdata(response.data.vehicles);
        console.log(
          "🚀 ~ file: HomePage.js:19 ~ .then ~ response.data",
          response.data.vehicles
        );
        setisLoading(false);
      })

      .catch((err) => {
        // Jika Gagal
        setisError(true);
        setisLoading(false);
      });
  }, []);

  if (isLoading) return <h1>Loading data</h1>;
  else if (data && !isError)
    return (
      <Fragment>
        <div className="app" style={{ marginLeft: "5em" }}>
          {data &&
            data.map((item) => (
              <div>
                <hr />
                <h1>{item.title.toUpperCase()}</h1>
                <i>{item.capacity}</i>
                <i>{String(item.availability)}</i>
                <i>{item.color}</i>
                <i>{item.model}</i>
                <i>{item.platenumber}</i>
                <i>{item.capacity}</i>
                <i>{item.price}</i>
                <i>{item.seat}</i>
                <i>{item.rate}</i>
                <i>{item.transmission}</i>
                <i>{item.year}</i>

                <i>{item.description}</i>
                <img src={item.image}></img>
                <hr />
              </div>
            ))}
        </div>
      </Fragment>
    );
  else {
    return <h1>Something Went Wrong</h1>;
  }
}
