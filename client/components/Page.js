import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Popup from "./popup";
import { EditPost } from "./EditPost";

export function Page(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const navigate = useNavigate();
  const currentUserId = useOutletContext();
  const { _id, title, text, user_id } = props.data;
  const [state, setState] = useState(_id);

  function pageDelete() {
    const deletePostRequest = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        post_id: _id,
        creator: user_id,
        currentUserId: currentUserId[0],
      }),
    };

    fetch(`/api/feed/${_id}`, deletePostRequest).then((response) => {
      if (response.status === 410) {
        console.log("item deleted before your request.");
        return navigate("/");
      } else {
        console.log(response.json());
        navigate("/");
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

      {user_id === currentUserId[0] && (
        <div>
          <button
            className="shadow-md my-4 mx-4 text-center items-center justify-center rounded-xl border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-s hover:bg-orange-500"
            onClick={() => setButtonPopup(true)}
          >
            edit
          </button>
          <button
            className="shadow-md my-4 text-center items-center justify-center rounded-xl border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-s hover:bg-orange-500"
            onClick={pageDelete}
          >
            delete
          </button>
        </div>
      )}
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <EditPost post_id={state} />
      </Popup>
    </div>
  );
}
