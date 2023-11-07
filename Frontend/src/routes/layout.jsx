import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context';
import './layout.css'
import Login from "./login";

export default function Layout() {

  const [loggedIn, setLoggedIn] = useState(false);
  
  return (
    <>
    <Context.Provider value={[loggedIn, setLoggedIn]}>
      <div className="main-content">
        {loggedIn === false && <Login />}
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
