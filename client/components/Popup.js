import React from "react";

export default function Popup(props) {
  return props.trigger ? (
    <div className="popup absolute top-0 left-0 w-full h-screen bg-gray-200 flex justify-center items-center rounded-3xl">
      <div className="popup-inner relative p-8 w-full max-w-xl bg-white">
        <button
          className="close-btn absolute top-4 right-4 font-medium border border-transparent"
          onClick={() => props.setTrigger(false)}>
          x
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}
