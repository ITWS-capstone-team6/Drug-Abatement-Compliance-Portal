import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import './layout.css'

import { useAtom } from 'jotai';
import { loggedInAtom } from '../state/login';
import { userAwsUserIdAtom, userIsAdminAtom} from '../state/userInfo';
import { useEffect } from "react";

export default function Layout() {


  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);

  const [awsUserId] = useAtom(userAwsUserIdAtom);
  const [userIsAdmin, setUserIsAdmin] = useAtom(userIsAdminAtom);

  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (!loggedIn && location !== "/login" && location !== "/signUp") {

      console.log("user is not logged in")
      // navigate("/login")
    }
  }, [loggedIn, userIsAdmin]);

  useEffect(() => {
    if (loggedIn) {
       // fetch call to api with the query being the user id
      //  api returns user info from database
      // query api to see the user info
      // fetch(`http://localhost:5000/isAdmin?`+ new URLSearchParams({userId: awsUserId}))
      // .then((response) => {
      //   return response.json();
      // }).then((data) => {
      //   setUserIsAdmin(data);
      // })
      console.log("is logged in - checks admin in a diff way now")
    }
  }, [loggedIn, awsUserId]);


  const test = () => {
    console.log("test")
    navigate("/admin-dashboard")
  }
  const logOut = () => {
    console.log("log out")
    setLoggedIn(false);
    setUserIsAdmin(false);
    navigate("/")
  }

  return (
    <>
      <div className="main-content">
        { loggedIn && <Navbar /> }
        <Outlet />

        {/* <button onClick={test}>test</button>
        <button onClick={logOut}>log out</button> */}
      </div>
    </>
  );
}
