import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Signup } from "./Signup";
import { Login } from "./Login";
import logo from "../src/logo.png";
import Popup from "./popup";

export function Home() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [loginPopup, setloginPopup] = useState(false);
  const [signupPopup, setsignupPopup] = useState(false);

  useEffect(() => {
    fetch("/api/auth").then((res) => {
      if (res.status === 200) navigate("/post");
      console.clear();
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between mx-12 my-8">
        <img
          className="object-scale-down h-20 rounded-3xl"
          src={logo}
          alt="Logo"
        />
        <div className="flex space-x-10">
          {/* <button
            className="items-center justify-center rounded-xl border-2 border-orange-400 bg-white-400 px-4 py-2 text-base font-medium text-orange-400 shadow-s hover:text-orange-500"
            onClick={() => navigate("/login")}
          >
            login
          </button> */}
          <button
            className="items-center justify-center rounded-xl border-2 border-orange-400 bg-white-400 px-4 py-2 text-base font-medium text-orange-400 shadow-s hover:text-orange-500"
            onClick={() => {
              setButtonPopup(true);
              setsignupPopup(false);
              setloginPopup(true);
            }}
          >
            login
          </button>
          <button
            className="items-center justify-center rounded-xl border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-s hover:bg-orange-500"
            onClick={() => {
              setButtonPopup(true);
              setloginPopup(false);
              setsignupPopup(true);
            }}
          >
            signup
          </button>
        </div>
      </div>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        {loginPopup && <Login />}
        {signupPopup && <Signup />}
      </Popup>
    </div>
  );
}
