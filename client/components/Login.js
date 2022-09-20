import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [msg, setMsg] = useState("");

  const alertBox = (input) => {
    // clear the username and password field
    setUsername("");
    setPassword("");
    setMsg(input);
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 2000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("hello login->");
    // console.log(`username: ${username} \npassword: ${password}`);

    if (username && password) {
      const loginReq = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      };
      fetch("/api/login/", loginReq).then((response) => {
        if (response.status === 200) {
          console.log("login success!"); // need to route to another page
          navigate('/post')
        }
        if (response.status === 406) {
          alertBox("username or password incorrect");
        }
      });
    } else {
      alertBox("please input username or password.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {isAlertVisible && <h3>{msg}</h3>}
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
