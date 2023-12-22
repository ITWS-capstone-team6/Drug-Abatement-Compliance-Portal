/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import './layout.css'

import { useAtom } from 'jotai';
import { loggedInAtom } from '../state/login';
import { userAwsUserIdAtom, userIsAdminAtom} from '../state/userInfo';
import { useEffect } from "react";

export default function Layout() {


  const [loggedIn] = useAtom(loggedInAtom);

  const [awsUserId] = useAtom(userAwsUserIdAtom);
  const [userIsAdmin] = useAtom(userIsAdminAtom);

  const location = useLocation();


  useEffect(() => {
    if (!loggedIn && location !== "/login" && location !== "/signUp") {

      console.log("user is not logged in")
    }
  }, [loggedIn, userIsAdmin]);

  useEffect(() => {
    if (loggedIn) {
      console.log("is logged in - checks admin in a diff way now")
    }
  }, [loggedIn, awsUserId]);



  return (
    <>
      <div className="main-content">
        { loggedIn && <Navbar /> }
        <Outlet />
      </div>
    </>
  );
}
