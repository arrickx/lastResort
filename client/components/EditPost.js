import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [creator, setCreator] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [msg, setMsg] = useState("");
  const { id } = useParams(); // post id

  const alertBox = (input) => {
    // clear the username and password field
    setMsg(input);
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 2000);
  };

  useEffect(() => {
    fetch(`/api/feed/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const { title, text, user_id } = data[0];
        // console.log(title, text, user_id)
        setTitle(title);
        setText(text);
        setCreator(user_id);
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
        body: JSON.stringify({ title: title, text: text, post_id: id }), 
      };

      // console.log(editPostRequest);

      fetch(`/api/feed/${id}`, editPostRequest).then((response) => {
        if (response.status === 200) {
          console.log("edit post success!"); // need to route to another page
          navigate('/post')
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
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Update" />
      </form>
    </div>
  );
}
