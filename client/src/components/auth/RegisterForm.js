import React from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <div class="mx-auto my-36 flex h-[370px] w-[350px] flex-col border-2 bg-white text-black shadow-xl">
      <div class="mx-8 mt-8 mb-4 flex flex-row justify-start space-x-2">
        <div class="h-7 w-3 bg-[#0DE6AC]"></div>
        <div class="w-3 text-center font-sans text-xl font-bold">
          <h1>Register</h1>
        </div>
      </div>
      <div class="flex flex-col items-center">
        <div class="relative mb-3">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <input
            type="email"
            id="input-group-1"
            class="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@domain.com"
          ></input>
        </div>

        <div class="relative mb-3">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="input-group-1"
            class="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
          ></input>
        </div>

        <div class="relative mb-6">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
          </div>
          <input
            type="password"
            id="input-group-1"
            class="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Password"
          ></input>
        </div>
      </div>

      <div class="my-1 flex justify-center">
        <button class="w-80 border bg-[#0DE6AC] p-2 font-sans">Register</button>
      </div>
      <div class="mx-7 my-3 flex justify-between text-sm font-semibold">
        <div class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          <Link to="/ForgotPass">Forget Password</Link>
        </div>
        <div class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
