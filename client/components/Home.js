import React, { useState } from "react";

export function Home() {
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
      <button onClick={sayHello}>submit</button>
    </div>
  );
}
