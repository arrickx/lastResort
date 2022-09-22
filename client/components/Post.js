import React, { useState, useEffect } from "react";
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
      <Link to={`/post/${_id}`} key={_id} state={{data: el}}>
          <div style={{"display": "block"}}>
            <p>post: {_id} creator: {user_id}</p>
            <p>{title}</p>
            <p style={{"whiteSpace": "pre-wrap"}}>{text}</p>
            <br />
          </div>
      </Link>
    )
  })

  return (
    <div>
      <h1>Post</h1>
      <br />
      <div>{testPosts}</div>
    </div>
  );
}
