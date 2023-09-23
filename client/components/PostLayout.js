import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import Cookies from "js-cookie";
import logo from "../src/logo.png";
import Popup from "./Popup";
import {NewPost} from "./NewPost"


export function PostLayout() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const navigate = useNavigate();
  const user_id = Cookies.get("user_id");

  const styles = useSpring({
    opacity: buttonPopup ? 1 : 0,
    config: { duration: "300" },
  });

  useEffect(() => {
    fetch("/api/auth").then((res) => {
      // if (res.status === 200) console.log("auth!");
      if (res.status === 400) navigate("/");
      if (res.status === 401) navigate("/");
      console.clear();
    });
  }, []);

  const logout = () => {
    fetch("/api/logout").then((res) => {
      console.log(res.json());
    });
    navigate("/");
  };

  return (
    <div>
      <div className="flex items-center justify-between mx-12 my-8">
        <img
          onClick={() => navigate("/")}
          className="object-scale-down h-20 rounded-3xl cursor-pointer shadow-xl"
          src={logo}
          alt="Logo"
        />
        <div className="flex space-x-10">
          <button
            className="items-center shadow-md justify-center rounded-xl border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-s hover:bg-orange-500 focus:outline-none transition duration-500 ease-in-out"
            // onClick={() => navigate("/post/new")}
            onClick={() => {
              setButtonPopup(true);
            }}
          >
            new
          </button>
          <br />
          <button
            className="items-center shadow-md justify-center rounded-xl border-2 border-orange-400 bg-white-400 px-4 py-2 text-base font-medium text-orange-400 shadow-s hover:text-orange-500 focus:outline-none transition duration-500 ease-in-out"
            onClick={logout}
          >
            logout
          </button>
        </div>
      </div>
      
      <animated.div style={styles}>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup} >
          <NewPost user_id={user_id}/>
        </Popup>
      </animated.div>

      <Outlet context={[user_id]} />
    </div>
  );
}
