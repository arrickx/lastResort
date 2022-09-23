import React from "react";

export default function Popup(props) {
  return props.trigger ? (
    <div className="popup absolute top-0 left-0 w-full h-screen bg-yellow-500 bg-opacity-20 flex justify-center items-center">
      <div className="popup-inner relative p-8 w-full max-w-xl bg-white rounded-3xl">
        <button
          className="close-btn absolute top-4 right-6 px-4 py-2 font-medium border border-transparent text-xl text-gray-500"
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
