import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export function PostLayout() { 
  const navigate = useNavigate();
  const user_id = Cookies.get('user_id');

  useEffect(() => {
    fetch("/api/auth").then((res) => {
      // if (res.status === 200) console.log("auth!");
      if (res.status === 400) navigate("/login");
      if (res.status === 401) navigate("/signup");
      console.clear()
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
    <button onClick={() => navigate("/")}>Home</button>
    <button onClick={() => navigate("/post/new")}> new </button>
    <br />
    <button onClick={logout}>logout</button>
    <Outlet context={[user_id]}/>
  </div>
  )
}