import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import {userIdStateAtom, userEmailStateAtom} from '../state/userInfo';
import jwtDecode from 'jwt-decode'; // Update the import statement
import { useAtom } from 'jotai';


export default function PostInjury() {
  const [userId] = useAtom(userIdStateAtom);
  const [userEmail]= useAtom(userEmailStateAtom);
  const decodedToken= jwtDecode(userId);
  const awsUserId= decodedToken.sub; //userId
  console.log("aws userid: " + awsUserId);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    idNumber: awsUserId,
    email: userEmail,
    requested: "true",
    employeeName: "",
    employeeId: "",
    addressCode: "",
    dateOfAccident: "",
    timeOfAccident: "",
    accidentInformation: "",
    refusal: "",
    notConducted: "",
    behaviorCheckboxes: {
      stumbling: false,
      unsteadyGait: false,
      drowsy: false,
      agitated: false,
      hostile: false,
      irritable: false,
      depressed: false,
      unresponsive: false,
      clumsy: false
    },
    appearanceCheckboxes: {
      flushedComplexion: false,
      excessiveSweating: false,
      coldClammySweats: false,
      bloodshotEyes: false,
      tearyWateryEyes: false,
      dilatedPupils: false,
      constrictedPupils: false,
      unfocusedStare: false
    },
    bodyOdorCheckboxes: {
      alcohol: false,
      marijuana: false
    }
  });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:5000/reasonableCause", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
  
        if (response.ok) {
          console.log("Form submitted successfully!");
        } else {
          console.error("Error submitting form");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
      alert("Thanks for submitting!");
      navigate(-1);
    }

    const handleInputChange = (e) => {
      const { name, checked } = e.target;
      const [category, checkbox] = name.split("-");
      setFormData(prevState => ({
        ...formData,
        [category]: {
          ...prevState[category],
          [checkbox]: checked
        }
      }));
    };
  const location = useLocation();

  return <>
<form class= "postAccidentForm" className="container mx-auto" onSubmit={handleSubmit}>
  <h2 className="text-2xl font-semibold mb-6">Supervisor Report</h2>

  <div class="employeeInfo">
  <h3 className="text-xl font-semibold mb-6">Section 1 - General</h3>
    <div class="flex mb-4">
      <div class="first-input-container">
        <label class="block mb-2 font-semibold">Employee Name</label>
        <textarea type="text" placeholder="Click to enter" name="employeeName"  value={formData.employeeName} onChange={handleInputChange}/>
      </div>
      <div class="second-input-container">
        <label class="block mb-2 font-semibold">Employee ID Number</label>
        <textarea type="text" placeholder="Click to enter" name="employeeId" value={formData.employeeId} onChange={handleInputChange}/>
      </div>
    </div>

    <div class="flex mb-4">
      <div class="first-input-container">
        <label class="block mb-2 font-semibold">Address Code</label>
        <textarea type="text" placeholder="Click to enter" name="addressCode"  value={formData.addressCode} onChange={handleInputChange}/>
      </div>
    </div>

    <div class="flex mb-4">
      <div class="first-input-container">
        <label class="block mb-2 font-semibold">Date of Incident</label>
        <textarea type="text" placeholder="Click to enter" name="dateOfAccident" value={formData.dateOfAccident} onChange={handleInputChange} />
      </div>
      <div class="second-input-container">
        <label class="block mb-2 font-semibold">Time of Incident</label>
        <textarea type="text" placeholder="Click to enter"  name="timeOfAccident" value={formData.timeOfAccident} onChange={handleInputChange}/>
      </div>
    </div>
    
  </div>


  <div className="employeeCircumstance">
    <h3 className="text-xl font-semibold mb-6">Section 2 - Reasonable Suspicion/Cause Indicators (Check those that apply)</h3>
    <div className="flex justify-between">
      <div className="column">
        <h4 className="text-lg font-semibold mb-4">Behavior</h4>
        {Object.keys(formData.behaviorCheckboxes).map(key => (
          <div className="mb-2 flex items-center" key={key}>
            <input type="checkbox" id={key} name={`behaviorCheckboxes-${key}`} checked={formData.behaviorCheckboxes[key]} onChange={handleInputChange}/>
            <label htmlFor={key} className="m-2">{key.replace(/([A-Z])/, ' $1').trim()}</label>
          </div>
        ))}
      </div>
      <div className="column">
        <h4 className="text-lg font-semibold mb-4">Appearance</h4>
        {Object.keys(formData.appearanceCheckboxes).map(key => (
        <div className="mb-2 flex items-center" key={key}>
            <input type="checkbox" id={key} name={`appearanceCheckboxes-${key}`} checked={formData.appearanceCheckboxes[key]} onChange={handleInputChange} />
            <label htmlFor={key} className="m-2">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
        </div>
        ))}
      </div>
      <div className="column">
        <h4 className="text-lg font-semibold mb-4">Body Odor</h4>
        {Object.keys(formData.bodyOdorCheckboxes).map(key => (
        <div className="mb-2 flex items-center" key={key}>
          <input type="checkbox" id={key} name={`bodyOdorCheckboxes-${key}`} checked={formData.bodyOdorCheckboxes[key]} onChange={handleInputChange}/>
          <label htmlFor={key} className="m-2">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
        </div>
        ))}
      </div>
  </div>
      <button type="submit">Submit</button>
  </div>
</form>


  </>
}