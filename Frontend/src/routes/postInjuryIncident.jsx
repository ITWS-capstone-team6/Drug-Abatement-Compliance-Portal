import { useLocation } from 'react-router-dom';
import React, { useState } from "react";


export default function PostInjury() {
    const [formData, setFormData] = useState({
      requested: "true",
      employeeName: "",
      employeeId: "",
      addressCode: "",
      dateOfAccident: "",
      timeOfAccident: "",
      accidentInformation: "",
      refusal: "",
      notConducted: ""
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:5000/postIncident", {
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
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  const location = useLocation();

  return <>
<form class= "postAccidentForm" className="container mx-auto" onSubmit={handleSubmit}>
  <h2 className="text-2xl font-semibold mb-6">Drug and Alcohol Test Required for Post-Injury Incident Testing</h2>

  <div class="employeeInfo">

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


  <div class="employeeCircumstance">
    <div class="mb-6">
      <label class="block mb-2 font-semibold">Incident Information (Circumstances, Employee Response, Supervisor Actions, and Observations)</label>
      <textarea placeholder="Click to enter" name= "accidentInformation" value={formData.accidentInformation} onChange={handleInputChange}></textarea>
    </div>

    <div class="mb-4">
      <label class="block mb-2 font-semibold">If the Employee Refuses to Test, State Why</label>
      <textarea class="placeholder-gray-300" placeholder="Click to enter" name="refusal" value={formData.refusal} onChange={handleInputChange}></textarea>
    </div>

    <div class="mb-6">
      <label class="block mb-2 font-semibold">Reason Why Alcohol Testing Could Not Be Conducted Within 8 Hours</label>
      <textarea class="placeholder-gray-300" placeholder="Click to enter" name="notConducted"  value={formData.notConducted} onChange={handleInputChange}></textarea>
    </div>

    <button type="submit">Submit</button>
  </div>
</form>


  </>
}