import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { useSpring, animated } from "@react-spring/web";
import logo from "../src/logo.png";
import backgroundImg from "../src/background.png";
import backgroundSvg from "../src/background.svg"
import Popup from "./popup";

export function Home() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [loginPopup, setloginPopup] = useState(false);
  const [signupPopup, setsignupPopup] = useState(false);

  const styles = useSpring({
    opacity: buttonPopup ? 1 : 0,
    config: { duration: "300" },
  });

  const backgroundStyles = useSpring({
    from: {
      opacity: 0,
      y: 50,
    },
    to: {
      opacity: 1,
      y: 0,
    },
    config: { duration: "800" },
  });


  useEffect(() => {
    fetch("/api/auth").then((res) => {
      if (res.status === 200) navigate("/post");
      console.clear();
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div
      className=" max-h-full w-screen h-screen bg-cover"
      style={{
        // backgroundImage: `url(${backgroundImg})`
        // backgroundImage: `url(${backgroundSvg})`
      }}
    >
      <div className="mx-12">
        <div className="flex items-center justify-between">
          <img
            className="object-scale-down h-20 rounded-3xl shadow-md mt-4"
            src={logo}
            alt="Logo"
          />
          <div className="flex space-x-10">
            <button
              className="transition duration-500 ease-in-out shadow-md items-center 
              justify-center rounded-xl border-2 border-orange-400 bg-white-400 px-4 
              py-2 text-base font-medium text-orange-400 shadow-s hover:text-orange-500 focus:outline-none"
              onClick={() => {
                setButtonPopup(true);
                setsignupPopup(false);
                setloginPopup(true);
              }}
            >
              login
            </button>
            <button
              className="transition duration-500 ease-in-out shadow-xl items-center justify-center 
              rounded-xl border border-transparent bg-orange-400 px-4 py-2 text-base font-medium 
              text-white shadow-s hover:bg-orange-500  focus:outline-none"
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
      </div>
      <animated.div className="h-4/5" style={backgroundStyles}>
        <div className="font-mono text-3xl mt-24 text-center text-red-400">A place where you can express your feelings</div>
        <img className="h-full w-full object-cover" src={backgroundSvg}></img>
      </animated.div>

      <animated.div style={styles}>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          {loginPopup && <Login />}
          {signupPopup && <Signup />}
        </Popup>
      </animated.div>
    </div>
  );
}
