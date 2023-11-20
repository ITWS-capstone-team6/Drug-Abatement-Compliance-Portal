import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import './layout.css'
import Login from "./login";
import SignUp from "./signUp";

import { useAtom } from 'jotai';
import { loggedInAtom, loginStateAtom } from '../state/login';
import { useEffect } from "react";
const view = {
  LOGIN: true,
  SIGNUP: false,
};
export default function Layout() {


  const [loggedIn] = useAtom(loggedInAtom);
  const [loginState] = useAtom(loginStateAtom);


  useEffect(() => {
    console.log("user is now logged in. this is where we would query for the user info from mongo now")
    // fetch call to api with the query being the user id
    //  api returns user info from database
  }, [loggedIn]);
  
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
