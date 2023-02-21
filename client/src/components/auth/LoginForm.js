import { useContext, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm = () => {
  // COntext
  const { loginUser } = useContext(AuthContext);

  //Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginForm;
  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);

      if (loginData.success) {
        toast.success(loginData.message);
      } else {
        toast.error(loginData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div onSubmit={login}>
      <Toaster />
      <div class="h-screen md:flex">
        <div class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          <div>
            <h1 class="text-white font-bold text-4xl font-sans">Sign In</h1>
            <p class="text-white mt-1">
              The most popular peer to peer lending at SEA
            </p>
            <button
              type="submit"
              class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              Read More
            </button>
          </div>
          <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form class="bg-white">
            <h1 class="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
            <p class="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>

            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                class="pl-2 outline-none border-none"
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={onChangeLoginForm}
              />
            </div>

            <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                class="pl-2 outline-none border-none"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChangeLoginForm}
              />
            </div>
            <button
              type="submit"
              class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Login
            </button>
            <div class="mb-3">
              <button
                onClick=""
                class="flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md"
              >
                <img
                  class="w-5 mr-2"
                  src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                />
                Sign in with Google
              </button>
            </div>

            <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              <Link to="/ForgotPass">Forget Password</Link>
            </span>
            <span class="text-sm ml-14 hover:text-blue-500 cursor-pointer">
              <Link to="/register">Sign Up</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
