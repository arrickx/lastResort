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
    <div className="flex items-center justify-between m-8">
      <img className="object-scale-down h-20 rounded-3xl" src={logo} alt="Logo" />
      <div className="flex space-x-6">
        <button className="items-center justify-center rounded-xl border-2 border-orange-400 bg-white-400 px-4 py-2 text-base font-medium text-orange-400 shadow-s hover:text-orange-500" onClick={() => navigate('/login')}>login</button>
        <button className="items-center justify-center rounded-xl border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-s hover:bg-orange-500" onClick={() => navigate('/signup')}>signup</button>
      </div>
    </div>
  );
}
