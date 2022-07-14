import React from 'react'
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Nav = () => {
  return <>
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/">All books</Link> |{" "}
        <Link to="book">Book</Link>
      </nav>
    </div>
    <Outlet />
  </>
}

export default Nav