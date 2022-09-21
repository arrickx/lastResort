import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function Post() {
  const [state, setState] = useState([]);

  useEffect(() => {
    fetch("/api/feed").then((res) => res.json())
    .then((data) => {
      // console.log(data[0])
      setState(data);
    }
    );
  }, []);

  const testPosts = state.map((el, i) => {
    const {_id, title, text, user_id} = el;
    return (
      <div key={_id}>
        <p>post: {_id} user: {user_id}</p>
        <p>{title}</p>
        <p style={{"whiteSpace": "pre-wrap"}}>{text}</p>
        <br />
      </div>
    )
  })

  return (
    <div>
      <h1>Post</h1>
      <br />
      <div>{testPosts}</div>
      <Link to="/post/1">Post 1</Link>
      <br />
      <Link to="/post/2">Post 2</Link>
    </div>
  );
}
