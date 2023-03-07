import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { toast, Toaster } from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthContext";
import FormattedDate from "../../../utils/FormattedDate";

const UserProfile = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const { updateUserProfile } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    age: "",
    phone: "",
    address: "",
    gender: "",
  });
  const { age, phone, address, gender } = userData;
  const onChangeUpdateForm = (event) =>
    setUserData({ ...userData, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateUserProfile(user._id, userData);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Toaster />
        <div className="flex flex-col items-center  ">
          <img
            alt="img"
            src={user.imageUrl}
            className="w-20 border-4 border-white rounded-full"
          />
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-2xl ">{user.username}</p>
            <span className="bg-blue-500 rounded-full p-1" title="Verified">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-100 h-2.5 w-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </span>
          </div>
          <p className="text-gray-700">{user.email}</p>
          &nbsp;
        </div>
        <div className="flex flex-col items-center  -mt-1">
          <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
          <ul className="mt-2 text-gray-700">
            <li className="flex border-b py-2">
              <span className="font-bold w-24">Age:</span>
              <input
                type="number"
                name="age"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={user.age}
                
                onChange={onChangeUpdateForm}
              ></input>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-24">Phone:</span>
              <input
                type="number"
                name="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={user.phone}
                
                onChange={onChangeUpdateForm}
              ></input>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-24">Address:</span>
              <input
                type="text"
                name="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={user.address}
               
                onChange={onChangeUpdateForm}
              ></input>
            </li>{" "}
            <li className="flex border-b py-2">
              <span className="font-bold w-24">Gender:</span>
              <input
                type="text"
                name="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={user.gender}
              
                onChange={onChangeUpdateForm}
              ></input>
            </li>
            <li className="flex border-b py-2">
              <span className="font-bold w-24">Joined:</span>

              <span className="font-bold w-29">
                <FormattedDate date={user.createdAt} />
              </span>
            </li>
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-2 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Update Profile
            </button>
          </ul>
        </div>
      </Form>
    </div>
  );
};

export default UserProfile;
