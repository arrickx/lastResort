import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Post } from "./Post";
import { Page } from "./Page.js";
import { Error } from "./Error.js";
import { PostLayout } from "./PostLayout";
import { NewPost } from "./NewPost";
import { EditPost } from "./EditPost";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<PostLayout />}>
          <Route index element={<Post />} />
          <Route path=":id" element={<Page />} />
          <Route path=":id/edit" element={<EditPost />} />
          <Route path="new" element={<NewPost />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
export default App;
