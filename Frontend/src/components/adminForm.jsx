import './adminForm.css';
import AdminPostAccidentAndInjury from './adminPostAccidentAndInjury';
import AdminReasonable from './adminReasonable';

function Forms({request}) {
    if (request.type === "Post Accident" || request.type === "Post-Injury Incident") {
        return <AdminPostAccidentAndInjury request={request} />
    } else if (request.type === "Reasonable Cause/Suspicion") {
        return <AdminReasonable request={request} />
    }
}
export default function AdminForm({request}) {
    return <Forms request={request} />
};