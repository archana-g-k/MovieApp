import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [rememberPassword, setRememberPassword] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    const value = { username: username, password: password };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      const data = await response.json();
      console.log(data);

      if (!data?.access_token) {
        alert("Login failed");
      } else {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
         alert("Login Successful");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="background-container">
      <div
        className="container d-flex justify-content-center align-items-center vh-100"
        style={{ maxWidth: "700px" }}
      >
        <form className="p-4 border shadow w-100" onSubmit={handleLogin}>
          <h9 className="font-color">HELLO</h9>
          <h3 className="heading-color">WELCOME BACK</h3>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              USER NAME:
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              PASSWORD:
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              id="rememberPassword"
              className="form-check-input"
              checked={rememberPassword}
              onChange={() => setRememberPassword(!rememberPassword)}
            />
            <label htmlFor="rememberPassword" className="form-check-label">
              Remember Password
            </label>

            <a href="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Sign In
          </button>
          <p className="text-center">
            Don't have an account?<a href="/signup">Signup Now</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
