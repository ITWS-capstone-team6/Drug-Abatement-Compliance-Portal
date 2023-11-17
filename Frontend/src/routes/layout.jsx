import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context';
import './layout.css'
import Login from "./login";
import SignUp from "./signUp";

export default function Layout() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true); 
  const [signedUp, setSignedUp] = useState(false);
  const toggleShowLogin = () => setShowLogin(!showLogin); // Add this line
  
  
  return (
    <>
    <Context.Provider value={[loggedIn, setLoggedIn, showLogin, setShowLogin, signedUp, setSignedUp]}>
      <div className="main-content">
        {
          !loggedIn && (showLogin ? <Login toggleShowLogin={toggleShowLogin} /> : <SignUp toggleShowLogin={toggleShowLogin} />)
        }
        {(loggedIn || signedUp) &&
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
