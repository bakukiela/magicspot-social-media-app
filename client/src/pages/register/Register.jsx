import "../register/register.scss";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      setSuccess(true);
      alert("Your account has been created successfully. Use your username and password to login.")
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Magic Social</h1>
          <p>Welcome on my login page</p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username..."
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email@..."
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password..."
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Legal name..."
              name="name"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>Register</button>
            {success && <Navigate to="/login" />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
