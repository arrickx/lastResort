import React, { useState } from "react";
import { Link } from "react-router-dom";

function Post() {
  return (
    <>
      <h1>Post</h1>
      <Link to="/post/1">Post 1</Link>
      <br/>
      <Link to="/post/2">Post 2</Link>
    </>
  );
}

export default Post;