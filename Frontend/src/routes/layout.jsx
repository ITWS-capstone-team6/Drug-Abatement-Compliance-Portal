import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import './layout.css'

export default function Layout() {
  return (
    <>
      <div className="main-content">
        <Navbar />
        <Outlet />
      </div>
      
    </>
  );
}
