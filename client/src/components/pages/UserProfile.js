import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const UserProfile = () => {
  const {
    authState: {
      user: { username, avatar, email, createdAt },
    },
  } = useContext(AuthContext);

  return (
    <div>
      {username}
      {email}
      {createdAt}
      <img src={avatar} />
    </div>
  );
};

export default UserProfile;
