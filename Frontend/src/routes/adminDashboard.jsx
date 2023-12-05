import { useEffect, useState } from "react"

import _ from 'lodash';
import "./adminDashboard.css"
import AdminForm from "../components/adminForm"

export default function AdminDashboard() {
    
    const [requests, setRequests] = useState([])
    const [orig_requests, setOrigRequest] = useState([])
    // switch to useState to fetch filter fields from db?
    const request_status = ["Status", "Pending", "Approved", "Denied"];
    const form_type = ["Type", "Post Accident", "Post-Injury Incident", "Reasonable Cause/Suspicion"];

    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [selectedRequestPending, setSelectedRequestPending] = useState(null);

    useEffect(() => {
        getRequests()
    }, [])

    // Temp solution, switch to api call
    const getRequests = () => {
        fetch('/sampleRequests.json')
        .then((data) => data.json())
        .then((data) => {
            console.log(data)
            setRequests(data)
            setOrigRequest(data)
        })
    }

    const handleRequestStatusChange = (e) => {
        let status = e.target.value;
        if (status === "Status") {
            setSelectedStatus(null);
        }
        else {
            setSelectedStatus(status);
        }
    
        if (selectedType === null && status === "Status") {
            getRequests();
        }
        else {
            let new_requests = []
            for (let i=0; i < orig_requests.length; i++) {
                if (orig_requests[i].type === selectedType && orig_requests[i].status === status) {
                    new_requests.push(orig_requests[i]);
                }
                else if (selectedType === null && orig_requests[i].status === status) {
                    new_requests.push(orig_requests[i]);
                }
                else if (orig_requests[i].type === selectedType && status === "Status") {
                    new_requests.push(orig_requests[i]);
                }
            }
            setRequests(new_requests)
        }
    }
    
    const handleFormTypeChange = (e) => {
        let type = e.target.value;
        if (type === "Type") {
            setSelectedType(null);
        }
        else {
            setSelectedType(type);
        }
        if (type === "Type" && selectedStatus === null) {
            setRequests(orig_requests);
        }
        else {
            let new_requests = []
            for (let i=0; i < orig_requests.length; i++) {
                if (orig_requests[i].type === type && orig_requests[i].status === selectedStatus) {
                    new_requests.push(orig_requests[i]);
                }
                else if (type === "Type" && orig_requests[i].status === selectedStatus) {
                    new_requests.push(orig_requests[i]);
                }
                else if (orig_requests[i].type === type && selectedStatus === null) {
                    new_requests.push(orig_requests[i]);
                }
            }
            setRequests(new_requests);
        }
    }

    const selectRequest = (request) => {
        if (!_.isEqual(request, selectedRequest)) {
            setSelectedRequest(request)
            if (request.status === "Pending") {
                setSelectedRequestPending(true)
            } else {
                setSelectedRequestPending(false)
            }
        } else {
            setSelectedRequest(null)
        }
        
    }

    const handleRequest = (status) => {
        let temp = JSON.parse(JSON.stringify(selectedRequest))
        let temp2 = [...requests]
        temp.status = status
        for (let i=0; i < temp2; i++) {
            if (temp2[i].id === selectedRequest.id) {
                temp2[i].status = status
                break
            }
        }
        setRequests(temp2)
        setSelectedRequest(temp)
    }

    return (
        <>
            <div className="content">
                <form className='filter-form d-flex'>
                    <select defaultValue={'Status'} className='form-select w-auto' onChange={handleRequestStatusChange.bind(this)}>
                        {request_status.map((e, i) =>(
                        <option key={i} value={e}>{e}</option>
                        ))}
                    </select>
                    <select defaultValue={'Type'} className='form-select w-auto' onChange={handleFormTypeChange.bind(this)}>
                        {form_type.map((e, i) =>(
                        <option key={i} value={e}>{e}</option>
                        ))}
                    </select>
                </form>
                <div className="dashboard">
                    <div className="forms">
                        {requests.map((request, i) => (
                            <div key={i} className={`form-content ${_.isEqual(request, selectedRequest) ? "selected-req" : ""}`} onClick={()=>selectRequest(request)}>
                                <div>
                                    <p className='form-type'>{request.type}</p>
                                    <p className='submit-info'>Submitter: {request.managementRepName}</p>
                                    <p className='submit-info'>Date: {request.managementRepDate}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="show-form">
                        {selectedRequest ?
                            <div>
                                <div className="admin-form">
                                    <AdminForm request={selectedRequest} />
                                </div>
                                {selectedRequestPending ? <div className="button-group">
                                    <button type="button" className="approve" onClick={()=>handleRequest("Approved")}>Approve</button>
                                    <button type="button" className="deny" onClick={()=>handleRequest("Denied")}>Deny</button>
                                </div> : <p style={{ fontSize: '1.3em', textDecoration: 'underline', color: '#002FA7', textAlign: 'center'}}>This request is <span style={{fontWeight: 'bold'}}>{selectedRequest.status}</span>.</p>}
                
                            </div>
                                : <div className="no-form"><p>Select a form to read</p></div>}
                
                    </div>
                </div>
            </div>
        </>
    )
}
