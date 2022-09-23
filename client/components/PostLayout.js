import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../src/logo.png";
import Popup from "./popup";
import {NewPost} from "./NewPost"


export function PostLayout() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const navigate = useNavigate();
  const user_id = Cookies.get("user_id");

  useEffect(() => {
    fetch("/api/auth").then((res) => {
      // if (res.status === 200) console.log("auth!");
      if (res.status === 400) navigate("/login");
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
          className="object-scale-down h-20 rounded-3xl cursor-pointer"
          src={logo}
          alt="Logo"
        />
        <div className="flex space-x-10">
          <button
            className="items-center justify-center rounded-xl border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-s hover:bg-orange-500"
            // onClick={() => navigate("/post/new")}
            onClick={() => {
              setButtonPopup(true);
            }}
          >
            new
          </button>
          <br />
          <button
            className="items-center justify-center rounded-xl border-2 border-orange-400 bg-white-400 px-4 py-2 text-base font-medium text-orange-400 shadow-s hover:text-orange-500"
            onClick={logout}
          >
            logout
          </button>
        </div>
      </div>
      
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} >
        <NewPost user_id={user_id}/>
      </Popup>

      <Outlet context={[user_id]} />
    </div>
  );
}
