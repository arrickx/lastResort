import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import Popup from "./Popup";
import { EditPost } from "./EditPost";

export function Page(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const navigate = useNavigate();
  const currentUserId = useOutletContext();
  const { _id, title, text, user_id } = props.data;
  const [state, setState] = useState(_id);

  const styles = useSpring({
    opacity: buttonPopup ? 1 : 0,
    config: { duration: "300" },
  });

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
    <div className="text-xl">
      <h1 className="my-2 mx-4 mt-6 text-3xl text-orange-400">{title}</h1>
      <h2
        className="my-4 mx-4 whitespace-pre-wrap text-orange-400 max-h-96 overflow-y-auto 
        scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-gray-100 scrollbar-thumb-rounded"
      >
        {text}
      </h2>

      {user_id === currentUserId[0] && (
        <div>
          <button
            className="transition duration-500 ease-in-out shadow-md my-4 mx-4 text-center 
            items-center justify-center rounded-xl border border-transparent bg-orange-400 px-4 py-2 
            text-base font-medium text-white shadow-s hover:bg-orange-500 focus:outline-none"
            onClick={() => setButtonPopup(true)}
          >
            edit
          </button>
          <button
            className="transition duration-500 ease-in-out shadow-md my-4 text-center items-center 
            justify-center rounded-xl border border-transparent bg-orange-400 px-4 py-2 text-base 
            font-medium text-white shadow-s hover:bg-orange-500 focus:outline-none"
            onClick={pageDelete}
          >
            delete
          </button>
        </div>
      )}
      <animated.div style={styles}>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <EditPost post_id={state} />
        </Popup>
      </animated.div>
    </div>
  );
}
