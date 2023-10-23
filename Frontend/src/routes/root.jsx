import { Link, useLocation } from 'react-router-dom';
import "./root.css";

import FormCard from "../components/formCard";

const formInfo = [
  {name: "Post-Accident", desc: "Description", link: "postAccident"},
  {name: "Post-Injury Incident", desc: "Description", link: "postInjuryIncident"},
  {name: "Reasonable Cause/Suspicion", desc: "Description", link: "reasonableCauseSuspicion"}

]



export default function Root() {

  return (
    <>
      <div className="main">
      <h1>Forms</h1>
      <div className="formContainer">
        {formInfo.map((info, index) => {
            return <Link key={index} to={info.link}>
                <FormCard name={info.name} desc={info.desc} />
              </Link>
        })}
      </div>
      </div>
    </>
  );
}