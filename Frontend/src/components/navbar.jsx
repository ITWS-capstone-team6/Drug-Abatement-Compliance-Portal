import { Link } from "react-router-dom";

import "./navbar.css"
import logo from '../assets/United-Airlines-Logo.png';
import { useAtom } from 'jotai';
import { userInfoAtom } from "../state/userInfo";
import {userIdAtom, userEmailAtom} from '../state/userInfo';
import jwtDecode from 'jwt-decode'; // Update the import statement

export default function Navbar() {
  const [userInfo] = useAtom(userInfoAtom);
  const [userEmail]= useAtom(userEmailAtom);
  const [userId] = useAtom(userIdAtom);
  if(userId != null && userId != "undefined" && userId != "123"){
    const decodedToken= jwtDecode(userId);
    const awsUserId= decodedToken.sub; //userId
    console.log("aws user id: " + awsUserId);
    console.log("username: " + userEmail);
  }


  return (
    <ul id="navbar">
      <li className="logo">
        <Link to="">
          <img src={logo} alt="United Airlines logo"/>
        </Link>
      </li>
      <li>
        <h4>Hello, {userEmail}</h4>
      </li>
    </ul>
  );
}
