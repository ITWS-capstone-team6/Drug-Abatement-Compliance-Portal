import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import {userIdAtom, userEmailAtom} from '../state/userInfo';
import jwtDecode from 'jwt-decode'; 
import { useAtom } from 'jotai';


export default function PostInjury() {
  const [userId] = useAtom(userIdAtom);
  const [userEmail]= useAtom(userEmailAtom);
  const decodedToken= jwtDecode(userId);
  const awsUserId= decodedToken.sub; 
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
      reasonNotWithinEightHours: "",
      managementRepName: "",
      managementRepId: "",
      managementRepDate: "",
      managementRepPhone: ""
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
      alert("Thanks for submitting!");
      navigate(-1);
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

  return <>
<form className= "postAccidentForm container mx-auto" onSubmit={handleSubmit}>
  <h2 className="text-2xl font-semibold mb-6">Drug and Alcohol Test Required for Post-Injury Incident Testing</h2>

  <div className="employeeInfo">

    <div className="flex mb-4">
      <div className="first-input-container">
        <label className="block mb-2 font-semibold">Employee Name</label>
        <textarea type="text" placeholder="Click to enter" name="employeeName"  value={formData.employeeName} onChange={handleInputChange}/>
      </div>
      <div className="second-input-container">
        <label className="block mb-2 font-semibold">Employee ID Number</label>
        <textarea type="text" placeholder="Click to enter" name="employeeId" value={formData.employeeId} onChange={handleInputChange}/>
      </div>
    </div>

    <div className="flex mb-4">
      <div className="first-input-container">
        <label className="block mb-2 font-semibold">Address Code</label>
        <textarea type="text" placeholder="Click to enter" name="addressCode"  value={formData.addressCode} onChange={handleInputChange}/>
      </div>
    </div>

    <div className="flex mb-4">
      <div className="first-input-container">
        <label className="block mb-2 font-semibold">Date of Incident</label>
        <textarea type="text" placeholder="Click to enter" name="dateOfAccident" value={formData.dateOfAccident} onChange={handleInputChange} />
      </div>
      <div className="second-input-container">
        <label className="block mb-2 font-semibold">Time of Incident</label>
        <textarea type="text" placeholder="Click to enter"  name="timeOfAccident" value={formData.timeOfAccident} onChange={handleInputChange}/>
      </div>
    </div>
    
  </div>


  <div className="employeeCircumstance">
    <div className="mb-6">
      <label className="block mb-2 font-semibold">Incident Information (Circumstances, Employee Response, Supervisor Actions, and Observations)</label>
      <textarea placeholder="Click to enter" name= "accidentInformation" value={formData.accidentInformation} onChange={handleInputChange}></textarea>
    </div>

    <div className="mb-4">
      <label className="block mb-2 font-semibold">If the Employee Refuses to Test, State Why</label>
      <textarea className="placeholder-gray-300" placeholder="Click to enter" name="refusal" value={formData.refusal} onChange={handleInputChange}></textarea>
    </div>

    <div className="mb-6">
      <label className="block mb-2 font-semibold">Reason Why Alcohol Testing Could Not Be Conducted Within 8 Hours</label>
      <textarea className="placeholder-gray-300" placeholder="Click to enter" name="reasonNotWithinEightHours"  value={formData.reasonNotWithinEightHours} onChange={handleInputChange}></textarea>
    </div>
  </div>

  <div className="managementInfo">
    <h3 className="text-1xl font-bold mb-2 underline">Authorizing Management Representative:</h3>
    <div className="flex mb-4">
      <div className="first-input-container">
        <label className="block mb-2 font-semibold">Name</label>
        <textarea type="text" placeholder="Click to enter" name="managementRepName"  value={formData.managementRepName} onChange={handleInputChange}/>
      </div>
      <div className="second-input-container">
        <label className="block mb-2 font-semibold">ID Number</label>
        <textarea type="text" placeholder="Click to enter" name="managementRepId" value={formData.managementRepId} onChange={handleInputChange}/>
      </div>
    </div>

    <div className="flex mb-4">
      <div className="first-input-container">
        <label className="block mb-2 font-semibold">Date</label>
        <textarea type="text" placeholder="Click to enter" name="managementRepDate" value={formData.managementRepDate} onChange={handleInputChange} />
      </div>
      <div className="second-input-container">
        <label className="block mb-2 font-semibold">Phone Number</label>
        <textarea type="text" placeholder="Click to enter"  name="managementRepPhone" value={formData.managementRepPhone} onChange={handleInputChange}/>
      </div>
    </div>
    
  </div>

  <button type="submit" style={{backgroundColor: "var(--united-blue)", color: "white"}}>Submit</button>
</form>


  </>
}