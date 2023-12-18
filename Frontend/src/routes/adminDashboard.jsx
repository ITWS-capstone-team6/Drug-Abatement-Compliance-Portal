import { useEffect, useState } from "react"

import _ from 'lodash';
import "./adminDashboard.css"
import AdminForm from "../components/adminForm"
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
export default function AdminDashboard() {
    
    const [requests, setRequests] = useState([])
    const [orig_requests, setOrigRequest] = useState([])
    const request_status = ["Status", "Pending", "Approved", "Denied"];
    const form_type = ["Type", "Post Accident", "Post-Injury Incident", "Reasonable Cause/Suspicion"];
    const form_link = {"Post Accident": "postAccident", "Post-Injury Incident": "postIncident", "Reasonable Cause/Suspicion": "reasonableCause"}
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [selectedRequestPending, setSelectedRequestPending] = useState(null);
    const [open, setOpen] = useState(false);
    const [decision, setDecision] = useState(null);

    useEffect(() => {
        getRequests()
    }, [])

    const getRequests = () => {
        const incidentEndpoint = 'http://localhost:5000/findPostIncident';
        const accidentEndpoint = 'http://localhost:5000/findPostAccident';
        const reasonableCauseEndpoint = 'http://localhost:5000/findReasonableCause';
        fetch(incidentEndpoint)
            .then((response) => response.json())
            .then((incidentData) => {
                fetch(accidentEndpoint)
                    .then((response) => response.json())
                    .then((accidentData) => {
                        fetch(reasonableCauseEndpoint)
                            .then((response) => response.json())
                            .then((reasonableCauseData) => {
                                const combinedData = [...incidentData, ...accidentData, ...reasonableCauseData];
                                console.log(combinedData);
                                setRequests(combinedData);
                                setOrigRequest(combinedData);
                            })
                            .catch((error) => console.error('Error fetching /findReasonableCause:', error));
                    })
                    .catch((error) => console.error('Error fetching /findPostAccident:', error));
            })
            .catch((error) => console.error('Error fetching /findPostIncident:', error));
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
            console.log(request)
        } else {
            setSelectedRequest(null)
        }
    }

    const handleOpen = (status) => {
        if (status !== null && status !== "") {
            let formatStatus = ""
            if (status === "Approved") {
                formatStatus = "approve"
            } else {
                formatStatus = "deny"
            }
            setDecision(formatStatus);
        }
        else if (status === "") {
            handleRequest();
        }
        else if (status === null) {
            setDecision(null);
        }
        setOpen(!open)
    }

    const handleRequest = async () => {
        const id = selectedRequest._id
        let formType = form_link[selectedRequest.type]
        let status = ""
        if (decision === "approve") {
            status = "Approved"
        } else if (decision === "deny") {
            status = "Denied"
        }
        
        try {
            const response = await fetch(`http://localhost:5000/${formType}/1?updateStatus=${status}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({id: id})
            });
      
            if (response.ok) {
                console.log("Form status changed successfully!");
                getRequests();
                setSelectedRequest(null);
            } else {
              console.error("Error updating form");
            }
          } catch (error) {
            console.error("Network error:", error);
          }
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
                                    <button type="button" className="approve" onClick={()=>handleOpen("Approved")}>Approve</button>
                                    <button type="button" className="deny" onClick={()=>handleOpen("Denied")}>Deny</button>
                                </div> : <p style={{ fontSize: '1.3em', textDecoration: 'underline', color: '#002FA7', textAlign: 'center'}}>This request is <span style={{fontWeight: 'bold'}}>{selectedRequest.status}</span>.</p>}
                
                            </div>
                                : <div className="no-form"><p>Select a form to read</p></div>}
                
                    </div>
                    <Dialog className="confirm" open={open} handler={()=>handleOpen(null)}>
                        <div className="confirmDialog">
                        <DialogBody style={{textAlign: "center"}}>
                        Are you sure you want to <span style={{fontWeight: "bold"}}>{decision}</span> this request?
                        </DialogBody>
                        <DialogFooter className="dialogButtons">
                            <Button
                                variant="text"
                                onClick={()=>handleOpen(null)}
                                className="mr-1"
                                style={{backgroundColor: "grey", border: "none"}}
                            >
                                <span style={{color: "white"}}>Cancel</span>
                            </Button>
                            <Button style={{backgroundColor: "green", border: "none"}} onClick={()=>handleOpen("")}>
                                <span style={{color: "white"}}>Confirm</span>
                            </Button>
                        </DialogFooter>
                        </div>
                    </Dialog>
                </div>
            </div>
        </>
    )
}
