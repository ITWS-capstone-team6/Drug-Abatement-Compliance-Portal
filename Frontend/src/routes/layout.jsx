import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context';
import './layout.css'
import Login from "./login";
import SignUp from "./signUp";

export default function Layout() {

  const [loggedIn, setLoggedIn] = useState(true);
  const [showLogin, setShowLogin] = useState(true); 
  const toggleShowLogin = () => setShowLogin(!showLogin); // Add this line
  
  return (
    <>
    <Context.Provider value={[loggedIn, setLoggedIn, showLogin, setShowLogin]}>
      <div className="main-content">
        {
          !loggedIn && (showLogin ? <Login toggleShowLogin={toggleShowLogin} /> : <SignUp toggleShowLogin={toggleShowLogin} />)
        }
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
