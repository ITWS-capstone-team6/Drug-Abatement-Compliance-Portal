import { useLocation } from 'react-router-dom';


export default function PostAccident() {
  const location = useLocation();

  return <>
<form class= "postAccidentForm" className="container mx-auto">
  <h2 className="text-2xl font-semibold mb-6">Drug and Alcohol Test Required for Post-Injury Incident Testing</h2>

  <div class="employeeInfo">
    <div class="flex mb-4">
      <div class="first-input-container">
        <label class="block mb-2 font-semibold">Employee Name</label>
        <input type="text" class="placeholder-gray-300" placeholder="Click to enter" />
      </div>
      <div class="second-input-container">
        <label class="block mb-2 font-semibold">Employee ID Number</label>
        <input type="text" placeholder="Click to enter" />
      </div>
    </div>
  </div>
  <div class="employeeCircumstance">
    <div class="mb-6">
      <label class="block mb-2 font-semibold">Incident Information (Circumstances, Employee Response, Supervisor Actions, and Observations)</label>
      <textarea class="placeholder-gray-300" placeholder="Click to enter"></textarea>
    </div>

    <div class="mb-4">
      <label class="block mb-2 font-semibold">If the Employee Refuses to Test, State Why</label>
      <textarea class="placeholder-gray-300" placeholder="Click to enter"></textarea>
    </div>

    <div class="mb-6">
      <label class="block mb-2 font-semibold">Reason Why Alcohol Testing Could Not Be Conducted Within 8 Hours</label>
      <textarea class="placeholder-gray-300" placeholder="Click to enter"></textarea>
    </div>

    <button type="submit">Submit</button>
  </div>
</form>


  </>
}