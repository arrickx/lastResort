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
          <div className="flex flex-col justify-center items-center py-4">
            <div className="flex flex-col justify-center items-center py-4 w-3/5">              
              <p>post: {_id} creator: {user_id}</p>
              <p >{title}</p>
              <p className="text-center whitespace-pre-wrap h-18 line-clamp-3">{text}</p>
            </div>
          </div>
      </Link>
    )
  })

  return (
    <div>
      <h1 className="text-center">Post</h1>
      <div>{allPosts}</div>
    </div>
  );
}
