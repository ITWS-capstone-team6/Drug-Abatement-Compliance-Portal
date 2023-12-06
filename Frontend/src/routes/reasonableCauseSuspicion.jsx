import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import {userIdAtom, userEmailAtom} from '../state/userInfo';
import jwtDecode from 'jwt-decode'; // Update the import statement
import { useAtom } from 'jotai';


export default function PostInjury() {
  const [userId] = useAtom(userIdAtom);
  const [userEmail]= useAtom(userEmailAtom);
  const decodedToken= jwtDecode(userId);
  const awsUserId= decodedToken.sub; //userId
  console.log("aws userid: " + awsUserId);
  const navigate = useNavigate();

  const [dotChecked, setDotChecked] = useState(false);
  const [nonDotChecked, setNonDotChecked] = useState(false);
  const [onDutyChecked, setOnDutyChecked] = useState(false);
  const [notOnDutyChecked, setNotOnDutyChecked] = useState(false);
  const [trainedChecked, setTrainedChecked] = useState(false);
  const [notTrainedChecked, setNotTrainedChecked] = useState(false);

  const behavior = {
    stumbling: "Stumbling, unsteady gait", 
    drowsy: "Drowsy, sleepy, lethargic", 
    agitated: "Agitated, anxious, restless",
    hostile: "Hostile, belligerent", 
    irritable: "Irritable, moody", 
    depressed: "Depressed, withdrawn", 
    unresponsive: "Unresponsive, distracted",
    clumsy: "Clumsy, uncoordinated", 
    tremors: "Tremors, shakes", 
    fluLike: "Flu-like illness complaints", 
    suspicious: "Suspicious, paranoid",
    hyperactive: "Hyperactive, fidgety", 
    inappropriate: "Inappropriate, uninhibited behavior", 
    inability: "Inability or difficulty doing routine tasks",
    disorientation: "Disorientation or confusion", 
    unsafe: "Unsafe or erratic behavior or action", 
    possessing: "Possessing, dispensing, or using controlled substances or alcohol"
  }

  const appearance = {
    flushedComplexion: "Flushed Complexion", 
    excessiveSweating: "Excessive Sweating", 
    coldClammySweats: "Cold, clammy sweats", 
    bloodshotEyes: "Bloodshot eyes", 
    tearyWateryEyes: "Teary, watery eyes",
    dilatedPupils: "Dilated (large) pupils", 
    constrictedPupils: "Constricted (pinpoint) pupils", 
    unfocusedStare: "Unfocused, blank stare", 
    unkemptGrooming: "Unkempt grooming", 
    disheveledClothing: "Disheveled clothing"
  }
  const speech = {
    slurred: "Slurred, thick", 
    incoherent: "Incoherent", 
    exaggeratedEnunciation: "Exaggerated enunciation", 
    loud: "Loud, boisterous", 
    rapid: "Rapid, pressured", 
    excessivelyTalkative: "Excessively talkative",
    nonsensical: "Nonsensical, silly", 
    cursing: "Cursing, verbal abusiveness", 
    inappropriate: "Inappropriate verbal response to questions"}
  const bodyOdors = {
    alcohol: "Alcohol", 
    marijuana: "Marijuana"}

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
    dot: null,
    onDuty: null,
    reasonNotWithinTwoHours: "",
    reasonNotWithinEightHours: "",
    managementRepName: "",
    managementRepId: "",
    managementRepDate: "",
    managementRepPhone: "",
    secondaryManagementRepTrained: null,
    secondaryManagementRepName: "",
    secondaryManagementRepId: "",
    secondaryManagementRepDate: "",
    secondaryManagementRepPhone: "",
    behaviorCheckboxes: {
      stumbling: false,
      drowsy: false,
      agitated: false,
      hostile: false,
      irritable: false,
      depressed: false,
      unresponsive: false,
      clumsy: false,
      tremors: false,
      fluLike: false,
      suspicious: false,
      hyperactive: false,
      inappropriate: false,
      inability: false,
      disorientation: false,
      unsafe: false,
      possessing: false
    },
    appearanceCheckboxes: {
      flushedComplexion: false,
      excessiveSweating: false,
      coldClammySweats: false,
      bloodshotEyes: false,
      tearyWateryEyes: false,
      dilatedPupils: false,
      constrictedPupils: false,
      unfocusedStare: false,
      unkemptGrooming: false,
      disheveledClothing: false
    },
    bodyOdorCheckboxes: {
      alcohol: false,
      marijuana: false
    },
    speechCheckboxes: {
      slurred: false,
      incoherent: false,
      exaggeratedEnunciation: false,
      loud: false,
      rapid: false,
      excessivelyTalkative: false,
      nonsensical: false,
      cursing: false,
      inappropriate: false
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
    const { name, value } = e.target;
    const [category, checkbox] = name.split("-");
    if (checkbox) {
      let temp = formData[category]
      temp[checkbox] = value
      setFormData({ ...formData, [category]:temp })
    } else {
      setFormData({ ...formData, [name]: value });
    }
    // setFormData(prevState => ({
    //   ...formData,
    //   [category]: {
    //     ...prevState[category],
    //     [checkbox]: checked
    //   }
    // }));
    // const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    // console.log(formData)
  };

  const handleCheckboxChange = (e) => {
    const { id, name } = e.target;
    if (id === "dot" || id === "nondot") {
      if (id === "dot") {
        setDotChecked(!dotChecked);
        if (nonDotChecked) {
          setNonDotChecked(!nonDotChecked)
        }
        setFormData({ ...formData, [name]: true });
      } else {
        setNonDotChecked(!nonDotChecked)
        if (dotChecked) {
          setDotChecked(!dotChecked)
        }
        setFormData({ ...formData, [name]: false });
      }
    }
    else if (id === "onDuty" || id === "notOnDuty") {
      if (id === "onDuty") {
        setOnDutyChecked(!onDutyChecked);
        if (notOnDutytChecked) {
          setNotOnDutyChecked(!notOnDutyChecked)
        }
        setFormData({ ...formData, [name]: true });
      } else {
        setNotOnDutyChecked(!notOnDutyChecked)
        if (onDutyChecked) {
          setOnDutyChecked(!onDutyChecked)
        }
        setFormData({ ...formData, [name]: false });
      }
    }
    else if (id === "trained" || id === "notTrained") {
      if (id === "trained") {
        setTrainedChecked(!trainedChecked);
        if (notTrainedChecked) {
          setNotTrainedChecked(!notTrainedChecked)
        }
        setFormData({ ...formData, [name]: true });
      } else {
        setNotTrainedChecked(!notTrainedChecked)
        if (trainedChecked) {
          setTrainedChecked(!trainedChecked)
        }
        setFormData({ ...formData, [name]: false });
      }
    }
    
  };

  return <>
  <form className= "postAccidentForm container mx-auto" onSubmit={handleSubmit}>
    <h2 className="text-2xl font-semibold mb-6">Supervisor Report</h2>

    <div className="employeeInfo">
    <h3 className="text-xl font-semibold mb-6">Section 1 - General</h3>
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
      <h3 className="text-xl font-semibold mb-6">Section 2 - Reasonable Suspicion/Cause Indicators (Check those that apply)</h3>
      {/* <div className="flex justify-between"> */}
        <div className="column">
          <h4 className="text-lg font-semibold mb-4">Behavior</h4>
          <div style={{display: "flex", flexDirection: "column", maxHeight: "40vh", flexWrap:"wrap"}}>
            {Object.keys(formData.behaviorCheckboxes).map(key => (
              <div className="mb-2 flex items-center" key={key}>
                <input type="checkbox" id={key} name={`behaviorCheckboxes-${key}`} checked={formData.behaviorCheckboxes[key]} onChange={handleInputChange}/>
                <label htmlFor={key} className="m-2">{behavior[key]}</label>
              </div>
            ))}
          </div>
          
        </div>
        <div className="column">
          <h4 className="text-lg font-semibold mb-4">Appearance</h4>
          <div style={{display: "flex", flexDirection: "column", maxHeight: "40vh", flexWrap:"wrap"}}>
            {Object.keys(formData.appearanceCheckboxes).map(key => (
            <div className="mb-2 flex items-center" key={key}>
                <input type="checkbox" id={key} name={`appearanceCheckboxes-${key}`} checked={formData.appearanceCheckboxes[key]} onChange={handleInputChange} />
                <label htmlFor={key} className="m-2">{appearance[key]}</label>
            </div>
            ))}
          </div>
          
        </div>
        <div className="column">
          <h4 className="text-lg font-semibold mb-4">Speech</h4>
          <div style={{display: "flex", flexDirection: "column", maxHeight: "40vh", flexWrap:"wrap"}}>
            {Object.keys(formData.speechCheckboxes).map(key => (
            <div className="mb-2 flex items-center" key={key}>
              <input type="checkbox" id={key} name={`speechCheckboxes-${key}`} checked={formData.speechCheckboxes[key]} onChange={handleInputChange}/>
              <label htmlFor={key} className="m-2">{speech[key]}</label>
            </div>
            ))}
          </div>
        </div>
        <div className="column">
          <h4 className="text-lg font-semibold mb-4">Body Odor</h4>
          <div style={{display: "flex", flexDirection: "column", maxHeight: "40vh", flexWrap:"wrap"}}>
            {Object.keys(formData.bodyOdorCheckboxes).map(key => (
            <div className="mb-2 flex items-center" key={key}>
              <input type="checkbox" id={key} name={`bodyOdorCheckboxes-${key}`} checked={formData.bodyOdorCheckboxes[key]} onChange={handleInputChange}/>
              <label htmlFor={key} className="m-2">{bodyOdors[key]}</label>
            </div>
            ))}
          </div>
          
        </div>
    {/* </div> */}
    </div>

    <div className="mb-4">
      <label className="block mb-2 font-semibold">Was the employee on duty at the time of the incident:</label>
      <div className="flex items-center">
        <div className="mr-4">
          <input type="checkbox" id="onDuty" name="onDuty" checked={onDutyChecked} onChange={handleCheckboxChange}/>
          <label htmlFor="dot" className="ml-2">Yes</label>
        </div>
        <div>
          <input type="checkbox" id="notOnDuty" name="onDuty" checked={notOnDutyChecked} onChange={handleCheckboxChange}/>
          <label htmlFor="nondot" className="ml-2">No</label>
        </div>
      </div>
    </div>

    <div className="mb-4">
      <label className="block mb-2 font-semibold underline">Event Information (Circumstances, employee response, supervisor actions, other observations)</label>
      <textarea className="placeholder-gray-300" placeholder="Click to enter" name="eventInfo"  value={formData.eventInfo} onChange={handleInputChange}></textarea>
    </div>

    <div className="testingInfo">
      <h3 className="text-xl font-semibold mb-6">Section 3 - Testing Information</h3>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Check Requested Test:</label>
        <div className="flex items-center">
          <div className="mr-4">
            <input type="checkbox" id="dot" name="dot" checked={dotChecked} onChange={handleCheckboxChange}/>
            <label htmlFor="dot" className="ml-2">DOT</label>
          </div>
          <div>
            <input type="checkbox" id="nondot" name="dot" checked={nonDotChecked} onChange={handleCheckboxChange}/>
            <label htmlFor="nondot" className="ml-2">NONDOT</label>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Reason Why Alcohol Testing Could Not Be Conducted Within 2 Hours (DOT ONLY)</label>
        <textarea className="placeholder-gray-300" placeholder="Click to enter" name="reasonNotWithinTwoHours"  value={formData.reasonNotWithinTwoHours} onChange={handleInputChange}></textarea>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Reason Why Alcohol Testing Could Not Be Conducted Within 8 Hours (DOT and NONDOT)</label>
        <textarea className="placeholder-gray-300" placeholder="Click to enter" name="reasonNotWithinEightHours"  value={formData.reasonNotWithinEightHours} onChange={handleInputChange}></textarea>
      </div>
    </div>
    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
      <div className="managementInfo">
        <h3 className="text-1xl font-bold mb-2 underline">Primary Trained Management Representative:</h3>
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
      
      <div className="secondaryManagementInfo">
        <div style={{display: "flex", flexDirection: "row"}}>
          <h3 className="text-1xl font-bold mb-2 underline pr-5">Secondary Management Representative:</h3>
          <div className="flex items-center">
            <div className="mr-4">
              <input type="checkbox" id="trained" name="secondaryManagementRepTrained" checked={trainedChecked} onChange={handleCheckboxChange}/>
              <label htmlFor="trained" className="ml-2">Trained</label>
            </div>
            <div>
              <input type="checkbox" id="notTrained" name="secondaryManagementRepTrained" checked={notTrainedChecked} onChange={handleCheckboxChange}/>
              <label htmlFor="notTrained" className="ml-2">Not Trained</label>
            </div>
          </div>
          </div>
        
        <div className="flex mb-4">
          <div className="first-input-container">
            <label className="block mb-2 font-semibold">Name</label>
            <textarea type="text" placeholder="Click to enter" name="secondaryManagementRepName"  value={formData.secondaryManagementRepName} onChange={handleInputChange}/>
          </div>
          <div className="second-input-container">
            <label className="block mb-2 font-semibold">ID Number</label>
            <textarea type="text" placeholder="Click to enter" name="secondaryManagementRepId" value={formData.secondaryManagementRepId} onChange={handleInputChange}/>
          </div>
        </div>
        <div className="flex mb-4">
          <div className="first-input-container">
            <label className="block mb-2 font-semibold">Date</label>
            <textarea type="text" placeholder="Click to enter" name="secondaryManagementRepDate" value={formData.secondaryManagementRepDate} onChange={handleInputChange} />
          </div>
          <div className="second-input-container">
            <label className="block mb-2 font-semibold">Phone Number</label>
            <textarea type="text" placeholder="Click to enter"  name="secondaryManagementRepPhone" value={formData.secondaryManagementRepPhone} onChange={handleInputChange}/>
          </div>
        </div>
      </div>
    </div>
    <button type="submit">Submit</button>
  </form>


  </>
}