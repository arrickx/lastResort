import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

export function Post() {
  const user_id = Cookies.get('user_id');
  return (
    <div>
      <h1>Post</h1>
      <br />
      <Link to="/post/1">Post 1</Link>
      <br />
      <Link to="/post/2">Post 2</Link>
    </div>
  );
}
