import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { useSpring, animated } from "@react-spring/web";
import logo from "../src/logo.png";
import Popup from "./popup";

export function Home() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [loginPopup, setloginPopup] = useState(false);
  const [signupPopup, setsignupPopup] = useState(false);

  const styles = useSpring({
    opacity: buttonPopup ? 1 : 0,
    config: { duration: "300" },
  });

  useEffect(() => {
    fetch("/api/auth").then((res) => {
      if (res.status === 200) navigate("/post");
      console.clear();
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between mx-12 my-8 ">
        <img
          className="object-scale-down h-20 rounded-3xl shadow-md"
          src={logo}
          alt="Logo"
        />
        <div className="flex space-x-10">
          <button
            className="transition duration-500 ease-in-out shadow-md items-center justify-center rounded-xl border-2 border-orange-400 bg-white-400 px-4 py-2 text-base font-medium text-orange-400 shadow-s hover:text-orange-500 focus:outline-none"
            onClick={() => {
              setButtonPopup(true);
              setsignupPopup(false);
              setloginPopup(true);
            }}
          >
            login
          </button>
          <button
            className="transition duration-500 ease-in-out shadow-xl items-center justify-center rounded-xl border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-s hover:bg-orange-500  focus:outline-none"
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

      <animated.div style={styles}>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          {loginPopup && <Login />}
          {signupPopup && <Signup />}
        </Popup>
      </animated.div>
    </div>
  );
}
