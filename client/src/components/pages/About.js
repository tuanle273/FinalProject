import axios from "axios";
import React, { useEffect, useState } from "react";

const About = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/vehicle")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>Vehicle</h1>
      {posts ? (
        <>
          {posts.map((post) => {
            return (
              <div>
                <h4>{posts.title}</h4>
                <p>{posts.description}</p>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default About;
