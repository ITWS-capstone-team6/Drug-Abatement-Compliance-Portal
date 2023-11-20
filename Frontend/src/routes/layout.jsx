import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import './layout.css'
import Login from "./login";
import SignUp from "./signUp";

import { useAtom } from 'jotai';
import { loggedInAtom, loginStateAtom } from '../state/login';
const view = {
  LOGIN: true,
  SIGNUP: false,
};
export default function Layout() {


  const [loggedIn] = useAtom(loggedInAtom);
  const [loginState] = useAtom(loginStateAtom);

  
  return (
    <>
      <div className="main-content">
        {
          !loggedIn && (loginState === view.LOGIN ? <Login /> : <SignUp/>)
        }
        {loggedIn &&
          <>
          <Navbar />
          <Outlet />
          </>
        }
      </div>
    </>
  );
}
