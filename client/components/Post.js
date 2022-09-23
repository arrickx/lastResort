import React, { useState, useEffect } from "react";
import Popup from "./popup";
import { Page } from "./Page";

export function Post() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [page, setPage] = useState({});
  const [state, setState] = useState([]);

  useEffect(() => {
    fetch("/api/feed")
      .then((res) => res.json())
      .then((data) => {
        setState(data);
      });
  }, []);

  const allPosts = state.map((el, i) => {
    const { _id, title, text, user_id } = el;
    return (
      <div
        key={_id}
        onClick={() => {
          setButtonPopup(true);
          setPage(el);
        }}
      >
        <div className="flex flex-col justify-center items-center py-4 ">
          <div className="flex flex-col justify-center py-4 w-3/5 max-w-2xl px-8 mx-auto text-white bg-white rounded-xl shadow-xl dark:bg-orange-400 cursor-pointer">
            <h1 className=" text-xl">{title}</h1>
            <p className=" whitespace-pre-wrap h-18 line-clamp-3">{text}</p>
            
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1 className="text-center">Post</h1>

      {/* loading status */}
      {/* {!state[0] && 
      <div className="ml-40">
        <div role="status" class="max-w-sm animate-pulse transform transition-all duration-150 ease-out">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span class="sr-only">Loading...</span>
        </div>
      </div>} */}

      <div>{allPosts}</div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <Page data={page} />
      </Popup>
    </div>
  );
}
