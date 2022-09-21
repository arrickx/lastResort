import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function Post() {
  const [state, setState] = useState([]);

  useEffect(() => {
    fetch("/api/feed").then((res) => res.json())
    .then((data) => {
      setState(data);
    }
    );
  }, []);

  return (
    <div>
      <h1>Post</h1>
      <br />
      <Link to="/post/1">Post 1</Link>
      <br />
      <Link to="/post/2">Post 2</Link>
    </div>
  );
}
