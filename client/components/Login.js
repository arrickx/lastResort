import React, { useState } from "react";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('hello login->');
    console.log(`username: ${username} \npassword: ${password}`);
  }
  
  return (
    <div>
      <h1>Login</h1>
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
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
