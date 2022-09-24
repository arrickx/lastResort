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
    // console.log('title ->', title);
    // console.log('text ->', text);
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

      // console.log(editPostRequest);

      fetch(`/api/feed/${post_id}`, editPostRequest).then((response) => {
        if (response.status === 401) navigate("/");
        if (response.status === 200) {
          console.log("edit post success!"); // need to route to another page
          navigate("/");
        } else {
          alertBox("please input title or story.");
        }
      });
    }
  };

  return (
    <div>
      <h1>Edit</h1>
      {isAlertVisible && <h3>{msg}</h3>}
      <form className="text-xl" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          type="text"
          placeholder="say something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <input
          className="shadow-md my-4 text-center items-center justify-center rounded-xl border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-s hover:bg-orange-500 focus:outline-none"
          type="submit"
          value="Update"
        />
      </form>
    </div>
  );
}
