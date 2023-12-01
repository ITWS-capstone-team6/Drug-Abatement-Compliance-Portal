import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import './layout.css'
import Login from "./login";
import SignUp from "./signUp";

import { useAtom } from 'jotai';
import { loggedInAtom, loginStateAtom } from '../state/login';
import {userIdStateAtom, userEmailStateAtom} from '../state/userInfo';
import { useEffect } from "react";

const view = {
  LOGIN: true,
  SIGNUP: false,
};

export default function Layout() {


  const [loggedIn] = useAtom(loggedInAtom);
  console.log("logged in: " + loggedIn)
  const [loginState] = useAtom(loginStateAtom);

  const [userId] = useAtom(userIdStateAtom);
  const [userEmail]= useAtom(userEmailStateAtom);

  useEffect(() => {
    console.log("user is now logged in. this is where we would query for the user info from mongo now")
    // fetch call to api with the query being the user id
    //  api returns user info from database
  }, [loggedIn]);

  console.log("should show logged in userID: " + userId)
  console.log("email of user: " + userEmail)
  console.log("logged in: " + loggedIn)
  return (
    <>
      <div className="main-content">
        {
          loggedIn && (loginState === view.LOGIN ? <Login /> : <SignUp/>)
        }
        {(!loggedIn) &&
          <>
          <Navbar />
          <Outlet />
          </>
        }
      </div>
    </>
  );
}
