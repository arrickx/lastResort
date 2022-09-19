import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {Home} from "./Home";
import {Signup} from "./Signup";
import {Login} from "./Login";
import {Post} from "./Post";
import {Page} from "./Page.js";
import {Error} from "./Error.js";

function App() {
  return (
    <div>
      <nav>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/post">Post</Link></li>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/post" element={<Post />} />
        <Route path="/post/:id" element={<Page />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
export default App;
