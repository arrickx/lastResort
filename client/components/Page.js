import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export function Page() {
  const navigate = useNavigate();
  const location = useLocation()
  const { data } = location.state
  const {_id, title, text, user_id} = data;

  return (
    <div>
      <h1>Post {_id}</h1>
      <h1>{title}</h1>
      <h2>{text}</h2>
      <h2>{user_id}</h2>

      <button onClick={() => navigate(`./edit`)}>edit</button>
      <button>delete</button>
    </div>
  );
}

