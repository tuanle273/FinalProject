import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
  // COntext
  const { loginUser } = useContext(AuthContext);

  //Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [alert, setAlert] = useState(null);
  const { username, password } = loginForm;
  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        // history.push("/home");
      } else {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert}></AlertMessage>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeLoginForm}
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
          <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
