import "./formCard.css"




export default function FormCard({name, desc}) {

    return <>
      <div className="card">
        <h2 className="name">
          {name}
        </h2>
        <hr/>
        <p className="desc">
          {desc}
        </p>
      </div>
    </>
};