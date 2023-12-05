import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './formCard.css';

const FormCard = ({ name, desc, link, index }) => {
  return (
    <>
      <div className="card">
        <div>
          <h2 className="name" style={{ fontWeight: 'bold' }}>
            {name}
          </h2>
          <hr />
          <p className="desc">{desc}</p>
        </div>

        <Link className="openForm" key={index} to={link}>
          Open Form
        </Link>
      </div>
    </>
  );
};

FormCard.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default FormCard;
 