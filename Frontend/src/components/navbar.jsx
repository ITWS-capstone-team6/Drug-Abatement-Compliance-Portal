




import { Link } from "react-router-dom";

import "./navbar.css"

export default function Navbar() {
  const routes = [
    {
      path: "",
      name: "index"
    },
    {
      path: "postAccident",
      name: "Post Accident"
    },
    {
      path: "postInjuryIncident",
      name: "Post-Injury Accident"
    },
    {
      path: "reasonableCauseSuspicion",
      name: "Reasonable Cause/Suspicion"
    }
  ];

  return (
    <ul id="navbar">
      <li className="logo">
        <Link to="">
          <h1>United Airlines Drug Abatement Forms</h1>
        </Link>
      </li>
      {routes.map((route) => {
        return (
          <li key={route.path}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}
