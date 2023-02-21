import React, { useContext } from "react";
import AuthContextProvider from "../../../contexts/AuthContext";
import FormattedDate from "../../../utils/FormattedDate";
const UserProfile = () => {
  const {
    authState: { user },
  } = useContext(AuthContextProvider);
  console.log("🚀 ~ file: UserProfile.js:7 ~ UserProfile ~ user", user);
  return (
    <div>
      <div class="flex flex-col items-center -mt-2 ">
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
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={user.email}
              required
            ></input>
          </li>
          <li class="flex border-b py-2">
            <span class="font-bold w-24">Age:</span>
            <input
              type="number"
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={user.age}
              required
            ></input>
          </li>

          <li class="flex border-b py-2">
            <span class="font-bold w-24">Mobile:</span>
            <input
              type="number"
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={user.phone}
              required
            ></input>
          </li>

          <li class="flex border-b py-2">
            <span class="font-bold w-24">Location:</span>
            <input
              type="text"
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={user.address}
              required
            ></input>
          </li>
          <li class="flex border-b py-2">
            <span class="font-bold w-24">Joined:</span>

            <span class="font-thin w-24">
              <FormattedDate date={user.createdAt} />
            </span>
          </li>
          <li class="flex items-center border-b py-2 space-x-2">
            <span class="font-bold w-24">Elsewhere:</span>

            <a href="#" title="Twitter">
              <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 333333 333333"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                image-rendering="optimizeQuality"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path
                  d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm90493 110539c-6654 2976-13822 4953-21307 5835 7669-4593 13533-11870 16333-20535-7168 4239-15133 7348-23574 9011-6787-7211-16426-11694-27105-11694-20504 0-37104 16610-37104 37101 0 2893 320 5722 949 8450-30852-1564-58204-16333-76513-38806-3285 5666-5022 12109-5022 18661v4c0 12866 6532 24246 16500 30882-6083-180-11804-1876-16828-4626v464c0 17993 12789 33007 29783 36400-3113 845-6400 1313-9786 1313-2398 0-4709-247-7007-665 4746 14736 18448 25478 34673 25791-12722 9967-28700 15902-46120 15902-3006 0-5935-184-8860-534 16466 10565 35972 16684 56928 16684 68271 0 105636-56577 105636-105632 0-1630-36-3209-104-4806 7251-5187 13538-11733 18514-19185l17-17-3 2z"
                  fill="#1da1f2"
                ></path>
              </svg>
            </a>
            <a href="#" title="LinkedIn">
              <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 333333 333333"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                image-rendering="optimizeQuality"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path
                  d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm-18220 138885h28897v14814l418 1c4024-7220 13865-14814 28538-14814 30514-1 36157 18989 36157 43691v50320l-30136 1v-44607c0-10634-221-24322-15670-24322-15691 0-18096 11575-18096 23548v45382h-30109v-94013zm-20892-26114c0 8650-7020 15670-15670 15670s-15672-7020-15672-15670 7022-15670 15672-15670 15670 7020 15670 15670zm-31342 26114h31342v94013H96213v-94013z"
                  fill="#0077b5"
                ></path>
              </svg>
            </a>
            <a href="#" title="Github">
              <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                width="0"
                height="0"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                image-rendering="optimizeQuality"
                fill-rule="evenodd"
                clip-rule="evenodd"
                viewBox="0 0 640 640"
              >
                <path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z"></path>
              </svg>
            </a>
          </li>
          <button
            type="submit"
            class="block w-full bg-indigo-600 mt-2 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Update Profile
          </button>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
