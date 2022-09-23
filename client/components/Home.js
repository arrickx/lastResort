import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../src/logo.png';

export function Home() {
  useEffect(() => {
    fetch("/api/auth").then((res) => {
      if (res.status === 200) navigate("/post");
      console.clear()
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-blue-500">home</h1>
      <img src={logo} alt="Logo" />
      <button onClick={() => navigate('/signup')}>signup</button>
      <button onClick={() => navigate('/login')}>login</button>
    </div>
  );
}
