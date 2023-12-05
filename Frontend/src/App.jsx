
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
import { userIsAdminAtom } from './state/userInfo';

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

  const [loggedIn] = useAtom(loggedInAtom);
  const [userIsAdmin] = useAtom(userIsAdminAtom);


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
