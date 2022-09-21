import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export function NewPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [msg, setMsg] = useState("");
  const [user_id] = useOutletContext();

  const alertBox = (input) => {
    // clear the username and password field
    setMsg(input);
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 2000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('title ->', title);
    // console.log('text ->', text);
    if (title && text) {
      const newPostRequest = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title: title, text: text, user_id }), // user_id is already a
      };

      fetch("/api/new/", newPostRequest).then((response) => {
        if (response.status === 200) {
          console.log("new post success!"); // need to route to another page
          navigate('/post')
        }});
    }else {
      alertBox("please input title or story.");
    }
  }

  return (
    <div>
      <h1>new post</h1>
      {isAlertVisible && <h3>{msg}</h3>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <br />
        <textarea type="text" placeholder="say something..." value={text} onChange={(e) => setText(e.target.value)}/>
        <br />
        <input type="submit" value="Post" />
      </form>
    </div>
  )
} 