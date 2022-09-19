import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function Post() {
  const navigate = useNavigate();

  const logout = () => {
    fetch("/api/logout")
    .then(res => {
      console.log(res.json());
    })
    navigate('/')
  }

  useEffect(() => {
    fetch("/api/auth")
    .then(res => {
      if (res.status === 200) console.log('auth!');
      if (res.status === 400) navigate('/login');
      if (res.status === 401) navigate('/signup');
    })

  });

  return (
    <div>
      <h1>Post</h1>
      <button onClick={ logout }>logout</button>
      <br />
      <Link to="/post/1">Post 1</Link>
      <br />
      <Link to="/post/2">Post 2</Link>
    </div>
  );
}
