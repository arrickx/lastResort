import React, { useState } from "react";
import { useParams, useLocation, useNavigate, useOutletContext } from "react-router-dom";

export function Page(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUserId = useOutletContext();
  // const { data } = location.state;
  // const { _id, title, text, user_id } = data; // user_id is creator id
  const { _id, title, text, user_id } = props.data;


  function pageDelete() {
    const deletePostRequest = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ post_id: _id, creator : user_id, currentUserId: currentUserId[0]}),
    };

    fetch(`/api/feed/${_id}`, deletePostRequest)
      .then((response) => {
        if (response.status === 410) {
          console.log('item deleted before your request.');
          return navigate("/post");
        } else {
          console.log(response.json());
          navigate("/post");
        }
      });
  }

  return (
    <div>
      <h1>Post {_id}</h1>
      <h1>{title}</h1>
      <h2>{text}</h2>
      <h2>creator: {user_id}</h2>
      <h2>current user:{currentUserId}</h2>

      { (user_id === currentUserId[0]) && <div>
        <button onClick={() => navigate(`./edit`)}>edit</button>
        <button onClick={pageDelete}>delete</button>
      </div>
      }
    </div>
  );
}
