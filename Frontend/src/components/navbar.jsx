




import { Link } from "react-router-dom";

import "./navbar.css"
import { useEffect, useState } from "react";
import logo from '../assets/United-Airlines-Logo.png';

export default function Navbar() {
  const [name, setName] = useState("First Last");

  useEffect(() => {
    setName("firstname lastname");
    // todo: change this to be an api call or something instead
    //  maybe figure out global state with react so we dont need to do 
    //   redundant api calls for every component
  }, [])


  return (
    <ul id="navbar">
      <li className="logo">
        <Link to="">
          <img src={logo} alt="United logo"/>
        </Link>
      </li>
      <li>
        <h4>{name}</h4>
      </li>
    </ul>
  );
}
