import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // handle popup message
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

  // handle submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(`username: ${username} \npassword: ${password}`); // test for submit button

    if (username && password) {
      const signupReq = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      };

      fetch("/api/signup/", signupReq).then((response) => {
        if (response.status === 200) {
          console.log("signup success!"); // need to route to another page
          navigate('/post')
        }
        if (response.status === 406) {
          alertBox("please select another username.");
        }
      });
    } else {
      alertBox("please input username or password.");
    }
  };

  return (
    <div>
      <h1>signup</h1>
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
        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
}
