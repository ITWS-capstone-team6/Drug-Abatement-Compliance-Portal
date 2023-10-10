import { useLocation } from 'react-router-dom';


export default function Root() {
  const location = useLocation();

  return (
    <>
      <p>this is the root (/) directory</p>
      <p>Current path: {location.pathname} </p>
      <p>file path: <pre>src/routes/root.jsx</pre></p>
    </>
  );
}