
import Layout from "./routes/layout";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes} from "react-router";
import Root from "./routes/root";
import PostInjuryIncident from "./routes/postInjuryIncident";
import PostAccident from "./routes/postAccident";
import ReasonableCauseSuspicion from "./routes/reasonableCauseSuspicion";
import Login from "./routes/login";
import SignUp from "./routes/signUp";
import AdminDashboard from "./routes/adminDashboard";
import "./App.css"

import { useAtom } from 'jotai';
import { loggedInAtom } from './state/login';
import { userIsAdminAtom, userIdAtom, userEmailAtom, userAwsUserIdAtom } from './state/userInfo';
import { useEffect } from "react";

const adminRoutes = [
  {path: "/", element: <Root />},
  {path: "/admin-dashboard", element: <AdminDashboard />}
];

const loginRoutes = [
  {path: "/", element: <Root />},
  {path: "/login", element: <Login />},
  {path: "/signUp", element: <SignUp/>}
];

const normalRoutes = [
  {path: "/", element: <Root />},
  {path: "/postAccident", element: <PostAccident />},
  {path: "/postInjuryIncident", element: <PostInjuryIncident />},
  {path: "/reasonableCauseSuspicion", element: <ReasonableCauseSuspicion />}
];



export default function App() {

  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [userId, setUserId] = useAtom(userIdAtom);
  const [userAwsUserId, setUserAwsUserId] = useAtom(userAwsUserIdAtom);
  const [userEmail, setUserEmail] = useAtom(userEmailAtom);
  const [userIsAdmin, setUserIsAdmin] = useAtom(userIsAdminAtom);

  useEffect(() => {
    console.log("checking session storage... (app)")
    let sessionLoggedIn = window.sessionStorage.getItem("loggedIn") === 'true';
    console.log(sessionLoggedIn)
    if (sessionLoggedIn != loggedIn) {
      let timeout = window.sessionStorage.getItem("timeout");
      if (!timeout || parseInt(timeout) < Date.now()) {
        console.log("updating session storage")
        // we take the current session to be the truth
        window.sessionStorage.setItem("userId", userId);
        window.sessionStorage.setItem("userAwsUserId", userAwsUserId);
        window.sessionStorage.setItem("userEmail", userEmail);
        window.sessionStorage.setItem("userIsAdmin", userIsAdmin);
        window.sessionStorage.setItem("loggedIn", loggedIn)
        window.sessionStorage.setItem("timeout", Date.now() + 3_600_000*12 ) // set timeout to be 12 hours from now
      } else {
        console.log("updating from session storage")
        // we update from session storage
        setLoggedIn(sessionLoggedIn);
        // ! could do error checking here
        setUserId(window.sessionStorage.getItem("userId"));
        setUserAwsUserId(window.sessionStorage.getItem("userAwsUserId"));
        setUserEmail(window.sessionStorage.getItem("userEmail"));
        setUserIsAdmin(window.sessionStorage.getItem("userIsAdmin") === "true");
      }
      
      

      // update session storage with current logged in status
    } else {
      // make sure that timeout hasnt occurred
      let timeout = window.sessionStorage.getItem("timeout");
      if (!timeout || parseInt(timeout) < Date.now()) {
        // logout();
        console.log("should log out")
      }
    }

  })


  return (
      <div id="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout />}>
            {loggedIn ? (
              userIsAdmin ? (
                adminRoutes.map((route) => {
                  return <Route key={route.path} path={route.path} element={route.element} />
                })
              ) : (
                normalRoutes.map((route) => {
                  return <Route key={route.path} path={route.path} element={route.element} />
                })
              )
            ) : (
              loginRoutes.map((route) => {
                return <Route key={route.path} path={route.path} element={route.element} />
              })
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    
    
  );
}
