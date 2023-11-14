import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context';
import './layout.css'
import Login from "./login";
import SignUp from "./signUp";

export default function Layout() {

  const [loggedIn, setLoggedIn] = useState(false);
  
  return (
    <>
    <Context.Provider value={[loggedIn, setLoggedIn]}>
      <div className="main-content">
        {(loggedIn === false && <Login />) || <SignUp/>}
        {loggedIn &&
          <>
          <Navbar />
          <Outlet />
          </>
        }
        
      </div>
    </Context.Provider>
      
      
    </>
  );
}
