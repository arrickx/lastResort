import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import Popup from "./Popup";
import { Page } from "./Page";

export function Post() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [page, setPage] = useState({});
  const [state, setState] = useState([]);

  const popupStyles = useSpring({
    opacity: buttonPopup ? 1 : 0,
    config: { duration: "300" },
  });

  const styles = useSpring({
    from: {
      opacity: 0,
      y: 50,
    },
    to: {
      opacity: 1,
      y: 0,
    },
    config: { duration: "500" },
  });

  useEffect(() => {
    fetch("/api/feed")
      .then((res) => res.json())
      .then((data) => {
        setState(data);
      });
  }, []);

  const allPosts = state.map((el, i) => {
    const { _id, title, text, create_time } = el;

    const date = new Date(create_time);
    date.setHours(date.getHours() -4)
    // console.log(date);
    const ts = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div key={_id}>
        <div className="flex flex-col justify-center items-center py-4 ">
          <div
            onClick={() => {
              setButtonPopup(true);
              setPage(el);
            }}
            className="flex flex-col py-4 w-3/5 max-w-2xl px-8 mx-auto text-white rounded-xl 
            shadow-xl bg-gradient-to-r from-orange-400 to-yellow-400 cursor-pointer transition 
            duration-500 ease-in-out  hover:scale-110 "
          >
            <div className="text-3xl">{title}</div>
            <div className=" self-end">{ts}</div>
            <p className="text-lg whitespace-pre-wrap h-18 line-clamp-3">
              {text}
            </p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1 className="text-4xl text-center text-orange-400 mb-3 font-mono">Post</h1>

      <animated.div style={styles}>{allPosts}</animated.div>
      <animated.div style={popupStyles}>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <Page data={page} />
        </Popup>
      </animated.div>
    </div>
  );
}
