import { loggedInAtom, loginStateAtom } from "../state/login";
import { userIsAdminAtom } from "../state/userInfo";
import { useState } from "react";

import { useAtom } from "jotai";
import AdminDashboard from "./adminDashboard";
import Login from "./login";
import SignUp from "./signUp";

const view = {
  LOGIN: true,
  SIGNUP: false,
};

import "./root.css";

import FormCard from "../components/formCard";
import { useEffect } from "react";

const formInfo = [
  {name: "Post-Accident", desc: "Documented when an event causes physical damage by an employee.", link: "postAccident"},
  {name: "Post-Injury Incident", desc: "Applies to Airport Operations and Catering Operations Division.", link: "postInjuryIncident"},
  {name: "Reasonable Cause/Suspicion", desc: "Conducted when an employee is reasonably suspected of using prohibited drugs or alcohol.", link: "reasonableCauseSuspicion"}

]



export default function Root() {
  const [loggedIn] = useAtom(loggedInAtom);
  const [userIsAdmin] = useAtom(userIsAdminAtom);
  const [loggedInState] = useAtom(loginStateAtom);

  const [currentComponent, setCurrentComponent] = useState(<Login/>);

  useEffect(() => {
    if (!loggedIn) {
      if (loggedInState == view.LOGIN) {
        return setCurrentComponent( <Login />)
      } else {
        return setCurrentComponent( <SignUp />)
      }
    } 
    if (userIsAdmin) {
      return setCurrentComponent( <AdminDashboard />)
    }
    return setCurrentComponent( <UserComponent />)
  }, [loggedIn, userIsAdmin, loggedInState])

  return (
    <>
      {currentComponent}
    </>
  );

  
}

function UserComponent() {
  return (
    <>
        <div className="formContainer">
          <h1>Forms</h1>
          <div className='note'>
            <p>All sections of the request must be completed for each employee and 
            <span> emailed immediately</span> to <a href='mailto:AfterHoursDA@United.com'>AfterHoursDA@United.com</a> <span>before</span> a test can be authorized.</p>
            <p>Once you have emailed this form, call Drug Abatement at (800) 421-6260.</p>
          </div>
          
          <div className="formContent">
            {formInfo.map((info, index) => {
              return <div key={index}>
                  <FormCard name={info.name} desc={info.desc} index={index} link={info.link} />
                </div>
            })}
          </div>
          
        </div>
    </>
  );
}

