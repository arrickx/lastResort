import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  useEffect(() => {
    fetch("/api/auth").then((res) => {
      if (res.status === 200) navigate("/post");
      console.clear()
    });
  }, []);


  const navigate = useNavigate();
  function sayHello() {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    console.log("hello click");
  }

  return (
    <div>
      <h1>home</h1>
      <button onClick={() => navigate('/signup')}>signup</button>
      <button onClick={() => navigate('/login')}>login</button>
      <br />
      <br />
      <button onClick={sayHello}>submit</button>
    </div>
  );
}
