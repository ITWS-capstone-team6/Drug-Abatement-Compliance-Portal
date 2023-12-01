import { Link } from "react-router-dom";

import "./navbar.css"
import logo from '../assets/United-Airlines-Logo.png';
import { useAtom } from 'jotai';
import { userEmailAtom} from '../state/userInfo';

export default function Navbar() {
  const [userEmail]= useAtom(userEmailAtom);


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
