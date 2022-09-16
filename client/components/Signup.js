import React, { useState } from "react";
import { useNavigate} from "react-router-dom";

export function Signup() {
  let navigate = useNavigate();
  return (
    <div>
      <h1>signup</h1>
      <button onClick={() => navigate("/")}>back home</button>
    </div>
  );
}
