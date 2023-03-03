import React, { useContext, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const PasswordReset = () => {
  const { passwordReset } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const { token } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await passwordReset(token, formData);
    console.log(
      "🚀 ~ file: PasswordReset.js:23 ~ handleSubmit ~ response:",
      response
    );

    if (response.status >= 200 && response.status < 300) {
      toast.success(response);
    } else {
      toast.success(response);
    }
  };

  return (
    <div>
      <section className="grid h-screen place-content-center  text-slate-300">
        {" "}
        <Toaster />
        <div className="mb-10 text-center text-indigo-400">
          <h1 className="text-3xl font-bold tracking-widest">PASSWORD RESET</h1>
          <p>
            <span className="font-bold">Password</span> and{" "}
            <span className="font-bold">Confirm</span> validation.
          </p>
        </div>
        <div className="mt-5">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                >
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    required
                    aria-describedby="email-error"
                  />
                </div>
                <p
                  className="hidden text-xs text-red-600 mt-2"
                  id="email-error"
                >
                  Please include a valid email address so we can get back to you
                </p>
              </div>
              <button
                type="submit"
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              >
                Reset password
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default PasswordReset;
