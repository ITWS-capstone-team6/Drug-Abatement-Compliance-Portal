import "./formCard.css"
import { Link, useLocation } from 'react-router-dom';



export default function FormCard({name, desc, index, link}) {

    return <>
    
      <div className="card">
        <div>
          <h2 className="name">
            {name}
          </h2>
          <hr/>
          <p className="desc">
            {desc}
          </p>
        </div>
        
        <Link className="openForm" key={index} to={link}>Open Form</Link>
      </div>
      
    </>
};