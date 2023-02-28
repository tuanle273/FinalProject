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
    email: "",
    age: "",
    phone: "",
    address: "",
    gender: "",
  });
  const { email, age, phone, address, gender } = userData;
  const onChangeUpdateForm = (event) =>
    setUserData({ ...userData, [event.target.name]: event.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateUserProfile(user._id, { userData });
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
        <div class="flex flex-col items-center  ">
          <img
            src={user.avatar}
            class="w-20 border-4 border-white rounded-full"
          />
          <div class="flex items-center space-x-2 mt-2">
            <p class="text-2xl ">{user.username}</p>
            <span class="bg-blue-500 rounded-full p-1" title="Verified">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-gray-100 h-2.5 w-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </span>
          </div>

          <p class="text-gray-700">{user.gender}</p>
          <p class="text-sm text-gray-500">{user.address}</p>
        </div>
        <div class="flex flex-col items-center  -mt-1">
          <h4 class="text-xl text-gray-900 font-bold">Personal Info</h4>
          <ul class="mt-2 text-gray-700">
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Email:</span>
              <input
                type="email"
                name="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={user.email}
                value={email}
                onChange={onChangeUpdateForm}
              ></input>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Age:</span>
              <input
                type="number"
                name="age"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={user.age}
                value={age}
                onChange={onChangeUpdateForm}
              ></input>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Phone:</span>
              <input
                type="number"
                name="phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={user.phone}
                value={phone}
                onChange={onChangeUpdateForm}
              ></input>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Address:</span>
              <input
                type="text"
                name="address"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={user.address}
                value={address}
                onChange={onChangeUpdateForm}
              ></input>
            </li>{" "}
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Gender:</span>
              <input
                type="text"
                name="gender"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={user.gender}
                value={gender}
                onChange={onChangeUpdateForm}
              ></input>
            </li>
            <li class="flex border-b py-2">
              <span class="font-bold w-24">Joined:</span>

              <span class="font-bold w-29">
                <FormattedDate date={user.createdAt} />
              </span>
            </li>
            <button
              type="submit"
              class="block w-full bg-indigo-600 mt-2 py-2 rounded-2xl text-white font-semibold mb-2"
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
