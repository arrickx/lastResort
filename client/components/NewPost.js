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
        <h3 className="text-center text-2xl font-bold text-orange-300">
          {msg}
        </h3>
      )}
      <form
        onSubmit={handleSubmit}
        className="text-xl flex flex-col justify-center items-center"
      >
        <input
          autoFocus
          className="border-b-2 w-4/5 text-2xl border-b-orange-300 outline-none my-2 
          mt-10 text-orange-300 placeholder-orange-300"
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          className="caret-orange-400 px-3  py-1.5 w-4/5 h-80 rounded-lg border-2 border-orange-300 
          focus:outline-orange-300 text-orange-300 placeholder-orange-300
          scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-gray-100 scrollbar-thumb-rounded"
          type="text"
          placeholder="say something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <input
          className="transition duration-500 ease-in-out my-4 text-center items-center 
          justify-center rounded-xl border border-transparent bg-orange-400 px-4 py-2 shadow-md 
          text-base font-medium text-white shadow-s hover:bg-orange-500 focus:outline-none"
          type="submit"
          value="Post"
        />
      </form>
    </div>
  );
}
