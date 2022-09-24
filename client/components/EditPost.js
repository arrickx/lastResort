import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export function EditPost(props) {
  const navigate = useNavigate();
  const currentUserId = useOutletContext();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [creator, setCreator] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [msg, setMsg] = useState("");
  const post_id = props.post_id;

  const alertBox = (input) => {
    // clear the username and password field
    setMsg(input);
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 2000);
  };

  useEffect(() => {
    fetch(`/api/feed/${post_id}`)
      .then((res) => res.json())
      .then((data) => {
        const { title, text, user_id } = data[0];
        if (user_id === currentUserId[0]) {
          setTitle(title);
          setText(text);
          setCreator(user_id);
        } else {
          console.log("unauthorized");
          navigate("/"); // back to the previous page
        }
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title && text) {
      const editPostRequest = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          text: text,
          post_id: post_id,
          currentUserId: currentUserId[0],
          creator: creator,
        }),
      };

      fetch(`/api/feed/${post_id}`, editPostRequest).then((response) => {
        if (response.status === 401) navigate("/");
        if (response.status === 200) {
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
        className="text-xl flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          autoFocus
          className="border-b-2 w-4/5 text-2xl border-b-orange-300 outline-none my-2 mt-10 
          text-orange-300 placeholder-orange-300"
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          className="caret-orange-400 px-3 py-1.5 w-4/5 h-96 rounded-lg border-2 
          border-orange-300 focus:outline-orange-300 text-orange-300 placeholder-orange-300
          scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-gray-100 scrollbar-thumb-rounded"
          type="text"
          placeholder="say something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <input
          className="transition duration-500 ease-in-out shadow-md my-4 text-center items-center justify-center rounded-xl border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-s hover:bg-orange-500 focus:outline-none"
          type="submit"
          value="Update"
        />
      </form>
    </div>
  );
}
