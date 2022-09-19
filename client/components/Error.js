import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Error() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  });

  return (
    <div>
      <h1>url not found</h1>
    </div>
  );
}
