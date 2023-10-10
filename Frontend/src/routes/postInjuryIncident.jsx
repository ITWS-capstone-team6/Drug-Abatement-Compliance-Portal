import { useLocation } from 'react-router-dom';



export default function PostInjuryIncident() {
  const location = useLocation();
  return <>
    <p>post-injury incident form goes here</p>
    <p>Current path: {location.pathname} </p>
    <p>file path: <pre>src/routes/postInjuryIncident.jsx</pre></p>
  </>
}