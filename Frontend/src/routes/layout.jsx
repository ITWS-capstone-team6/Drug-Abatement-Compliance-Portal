import { useNavigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import './layout.css'
import Login from "./login";
import SignUp from "./signUp";

import { useAtom } from 'jotai';
import { loggedInAtom, loginStateAtom } from '../state/login';
import {userIdAtom, userEmailAtom, userAwsUserIdAtom} from '../state/userInfo';
import { useEffect } from "react";

const view = {
  LOGIN: true,
  SIGNUP: false,
};
export default function Layout() {


  const [loggedIn] = useAtom(loggedInAtom);
  const [loginState] = useAtom(loginStateAtom);

  const [userId] = useAtom(userIdAtom);
  const [awsUserId] = useAtom(userAwsUserIdAtom);
  const [userEmail]= useAtom(userEmailAtom);



  useEffect(() => {
    if (loggedIn) {
      console.log("user is now logged in. this is where we would query for the user info from mongo now")
      // fetch call to api with the query being the user id
      //  api returns user info from database
      // query api to see the user info
      fetch("http://localhost:5000/isAdmin"+ new URLSearchParams({
        userId: awsUserId
      })).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data)
        if (data.isAdmin) {
          console.log("user is admin")
        } else {
          console.log("user is not admin")
        }
      })
    }
  }, [loggedIn, awsUserId]);

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
