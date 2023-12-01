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
        <div className="formContainer">
          <h1>Forms</h1>
          <div className='note'>
            <p>All sections of the Reasonable Cause/Suspicion Test Request must be completed for each employee and 
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