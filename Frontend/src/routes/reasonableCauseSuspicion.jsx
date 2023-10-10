import { useLocation } from 'react-router-dom';



export default function ReasonableCauseSuspicion() {
  const location = useLocation();
  return <>
    <p>reasonable cause/suspicion form goes here</p>
    <p>Current path: {location.pathname} </p>
    <p>file path: <pre>src/routes/reasonableCauseSuspicion.jsx</pre></p>
  </>
}