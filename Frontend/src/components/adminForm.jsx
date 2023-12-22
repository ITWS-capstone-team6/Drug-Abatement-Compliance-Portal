import PropTypes from 'prop-types';
import './adminForm.css';
import AdminPostAccidentAndInjury from './adminPostAccidentAndInjury';
import AdminReasonable from './adminReasonable';

export default function AdminForm({request}) {
    if (request.type === "Post Accident" || request.type === "Post-Injury Incident") {
        return <AdminPostAccidentAndInjury request={request} />
    } else if (request.type === "Reasonable Cause/Suspicion") {
        return <AdminReasonable request={request} />
    }
}

AdminForm.propTypes = {
    request: PropTypes.shape({
        type: PropTypes.string.isRequired
    }).isRequired
};
