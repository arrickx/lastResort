import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export function NewPost(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [msg, setMsg] = useState("");
  // const [user_id] = useOutletContext();

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
        // body: JSON.stringify({ title: title, text: text, user_id }), // user_id is already a
        body: JSON.stringify({
          title: title,
          text: text,
          user_id: props.user_id,
        }),
      };

      fetch("/api/new/", newPostRequest).then((response) => {
        if (response.status === 200) {
          // console.log("new post success!"); // need to route to another page
          navigate("/");
        }
      });
    } else {
      alertBox("please input title or story.");
    }
  };

  return (
    <div>
      {isAlertVisible && (
        <h3 className="text-center font-bold text-orange-300">{msg}</h3>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <input
          autoFocus
          className="text-center border-b-2 w-2/5 border-b-orange-300 outline-none my-4 mt-10"
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
        className="caret-orange-400 text-center w-1/2 h-40 rounded-lg border border-orange-300 focus:outline-orange-400"
          type="text"
          placeholder="say something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <input
          className="my-4 text-center items-center justify-center rounded-xl border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-s hover:bg-orange-500"
          type="submit"
          value="Post"
        />
      </form>
    </div>
  );
}
