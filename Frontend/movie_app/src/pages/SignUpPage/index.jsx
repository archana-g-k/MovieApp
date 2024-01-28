import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert("Registered successfully");
        console.log("Signup successful");
        navigate("/signin");
      } else {
        console.error("Signup failed:", responseData);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="background-container">
      <div
        className="container d-flex justify-content-center align-items-center vh-100"
        style={{ maxWidth: "700px" }}
      >
        <form className="p-4 border shadow w-100">
          <h9 className="font-color">WELCOME</h9>
          <h3 className="heading-color">TOBOLETO</h3>

          <div className="mb-3">
            <label htmlFor="username" className="heading-color">
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
            <label htmlFor="name" className="heading-color">
              NAME:
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="heading-color">
              EMAIL:
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="heading-color">
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

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Sign Up
          </button>
          <p className="heading-color">
            Already have an account?<a href="/signin">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
