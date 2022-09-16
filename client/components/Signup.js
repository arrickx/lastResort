import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`username: ${username} \npassword: ${password}`);
  };

  return (
    <div>
      <h1>signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="username"
            autoComplete="on"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="password"
            autoComplete="on"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <input type="submit" value="Sign up" />
      </form>
      <br />
      <button onClick={() => navigate("/")}>back home</button>
    </div>
  );
}
