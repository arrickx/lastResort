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

  const allPosts = state.map((el, i) => {
    const {_id, title, text, user_id} = el;
    return (
      <Link to={`/post/${_id}`} key={_id} state={{data: el}}>
          <div className="block py-4">
            <p>post: {_id} creator: {user_id}</p>
            <p>{title}</p>
            <p className="whitespace-pre-wrap">{text}</p>
          </div>
      </Link>
    )
  })

  return (
    <div>
      <h1>Post</h1>
      <div>{allPosts}</div>
    </div>
  );
}
