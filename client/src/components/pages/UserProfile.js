import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const UserProfile = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  console.log("🚀 ~ file: UserProfile.js:8 ~ UserProfile ~ user", user);
  return <div></div>;
};

export default UserProfile;
