import React, { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";
const RegisterForm = () => {
  // COntext
  const { registerUser } = useContext(AuthContext);

  //Local state
  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState(null);
  const { email, username, password, confirmPassword } = registerForm;
  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Password do not match" });
      setTimeout(() => setAlert(null), 5000);
      return;
    }
    try {
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
        // thanh cong
      } else {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert}></AlertMessage>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
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
