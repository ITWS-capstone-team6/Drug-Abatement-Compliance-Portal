import { useLocation } from 'react-router-dom';




export default function PostAccident() {
  const location = useLocation();

  return <>
    <p>Post accident form goes here</p>
    <p>Current path: {location.pathname} </p>
    <p>file path: <pre>src/routes/postAccident.jsx</pre></p>
    <button>this is a button</button>
  </>
}