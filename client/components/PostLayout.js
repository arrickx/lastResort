import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function PostLayout() { 
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/auth").then((res) => {
      if (res.status === 200) console.log("auth!");
      if (res.status === 400) navigate("/login");
      if (res.status === 401) navigate("/signup");
    });
  });

  const logout = () => {
    fetch("/api/logout").then((res) => {
      console.log(res.json());
    });
    navigate("/");
  };

  return (
  <div>
    <button onClick={logout}>logout</button>
    <Outlet />
  </div>
  )
}