import React, { useState } from "react";
import { useParams } from "react-router-dom";

export function Page() {
  const { id } = useParams();
  return (
    <h1>Page {id}</h1>
  );
}

