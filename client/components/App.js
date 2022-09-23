import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import { Post } from "./Post";
import { Error } from "./Error.js";
import { PostLayout } from "./PostLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<PostLayout />}>
          <Route index element={<Post />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
export default App;
