import { Link } from "react-router-dom";

import "./navbar.css"
import logo from '../assets/United-Airlines-Logo.png';
import { useAtom } from 'jotai';
import { userEmailAtom, userIsAdminAtom, userInfoAtom } from '../state/userInfo';
import { loggedInAtom } from '../state/login';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Navbar() {

  const [userEmail]= useAtom(userEmailAtom);
  const [, setUserIsAdmin]= useAtom(userIsAdminAtom);
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const navigate = useNavigate();

  const logout = () => {
    setLoggedIn(false);
    setUserIsAdmin(false);
    
    // flush session storage too
    console.log("flushing sesion storage now")
    window.sessionStorage.setItem("userId", "");
    window.sessionStorage.setItem("userAwsUserId", "");
    window.sessionStorage.setItem("userEmail", "");
    window.sessionStorage.setItem("userIsAdmin", false);
    window.sessionStorage.setItem("loggedIn", false)

    navigate("/")
  }

  return (
    <ul id="navbar">
      <li className="logo">
        <Link to="" className="backToHome">
          <img src={logo} alt="United Airlines logo"/>
        </Link>
      </li>
      <li>
        <div>
          <h4>Hello, {userEmail}</h4>
          <button className="logoutButton" onClick={logout}>Log Out</button>
        </div>
      </li>
    </ul>
  );
}
