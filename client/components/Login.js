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
          navigate("/post");
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
      <div>
        {isAlertVisible && (
          <h3 className="text-center font-bold text-orange-300">{msg}</h3>
        )}
        <form
          onSubmit={handleSubmit}
          className="text-xl flex flex-col justify-center items-center"
        >
          <label>
            <input
              autoFocus
              className="text-center border-b-2 border-b-orange-300 outline-none my-4 mt-10 text-orange-300 placeholder-orange-300"
              type="text"
              placeholder="username"
              autoComplete="on"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              className="text-center border-b-2 border-b-orange-300 outline-none my-4 text-orange-300 placeholder-orange-300"
              type="password"
              placeholder="password"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
          </label>
          <input
            className="shadow-md my-4 text-center items-center justify-center rounded-xl border border-transparent focus:outline-none bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-s hover:bg-orange-500"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
}
