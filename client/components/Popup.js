import React, { useEffect } from "react";

export default function Popup(props) {
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        props.setTrigger(false);
      }
    };
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);

    };
  }, []);

  return props.trigger ? (
    <div className=" absolute top-0 left-0 w-full h-full bg-yellow-500 bg-opacity-20 flex justify-center items-center ">
      <div className=" relative p-8 w-full max-w-2xl bg-white rounded-3xl">
        <button
          className="absolute top-4 right-6 px-4 py-2 font-medium border border-transparent text-2xl text-orange-400"
          onClick={() => props.setTrigger(false)}
        >
          x
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}
