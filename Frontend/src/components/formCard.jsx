import "./formCard.css"
import { Link, useLocation } from 'react-router-dom';



export default function FormCard({name, desc, index, link}) {

    return <>
    <Link key={index} to={link}>
      <div className="card">
          <h2 className="name">
            {name}
          </h2>
          <hr/>
          <p className="desc">
            {desc}
          </p>
        </div>
      </Link>
    </>
};