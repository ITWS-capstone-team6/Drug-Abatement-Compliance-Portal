import { useNavigate, Outlet } from "react-router-dom";
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
  const [loginState] = useAtom(loginStateAtom);

  const [userId] = useAtom(userIdStateAtom);
  const [userEmail]= useAtom(userEmailStateAtom);

  useEffect(() => {
    console.log("user is now logged in. this is where we would query for the user info from mongo now")
    // fetch call to api with the query being the user id
    //  api returns user info from database
    if (loggedIn) {
      console.log("logged in user id: " + userId)
      console.log("logged in user email: " + userEmail)
    }
  }, [loggedIn]);

  const navigate= useNavigate();

  const test = () => {
    console.log("test")
    navigate("/admin-dashboard")
  }

  console.log("should show logged in userID: " + userId)
  console.log("email of user: " + userEmail)
  return (
    <>
      <div className="main-content">
        {
          !loggedIn && (loginState === view.LOGIN ? <Login /> : <SignUp/>)
        }
        {(loggedIn) &&
          <>
          <Navbar />
          <Outlet />
          <button onClick={test}>test</button>
          </>
        }
      </div>
    </>
  );
}
