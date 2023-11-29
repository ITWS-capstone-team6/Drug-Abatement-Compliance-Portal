import { useState, useEffect } from 'react';

export default function AdminPostAccidentAndInjury({request}) {
    const [injury, setInjury] = useState(false);

    useEffect(() => {
        if (request.type === "Post-Injury Incident") {
            setInjury(true);
        } else {
            setInjury(false);
        }
    }, [request])

    return <>
    
        <div className='adminForm'>
            <div className="adminFormField">
                <div className="insideField">
                    <p className='key'>Requested Test:</p>
                    <p className='value'>{request.dot ? 'DOT' : 'NONDOT'}</p>
                </div>
            </div>
            <br />
            <div className="adminFormField">
                <div className="insideField">
                    <p className='key'>Employee Name:</p>
                    <p>{request.employeeName}</p>
                </div>
                <div className="insideField">
                    <p className='key'>Employee ID Number:</p>
                    <p>{request.employeeId}</p>
                </div>
                <div className="insideField">
                    <p className='key'>Company Address Code:</p>
                    <p>{request.addressCode}</p>
                </div>
            </div>
            <br />
            <div className="adminFormField">
                <div className="insideField">
                    <p className='key'>Date of accident:</p>
                    <p>{request.dateOfAccident}</p>
                </div>
                <div className="insideField">
                    <p className='key'>Time of accident:</p>
                    <p>{request.timeOfAccident}</p>
                </div>
            </div>
            <br />
            <div className="adminFormField">
                <div className="insideField">
                    <p className='key'>{injury ? 'Incident' : 'Accident'} Information:</p>
                    <p>{request.accidentInformation}</p>
                </div>
            </div>
            <br />
            <div className="adminFormField">
                <div className="insideField">
                    <p className='key'>If the employee refuses to test, state why:
                    <span>{request.refusal ? request.refusal : 'N/A'}</span></p>
                </div>
            </div>
            <br />
            <div className="adminFormField">
            {injury ? <></> : 
                <div className="insideField">
                    <p className='key'>Reason why alcohol testing could not be conducted within 2 hours (DOT ONLY):
                    <span>{request.reasonNotWithinTwoHours ? request.reasonNotWithinTwoHours : 'N/A'}</span></p>
                </div>}
                <div className="insideField">
                    <p className='key'>Reason why alcohol testing could not be conducted within 8 hours (DOT AND NONDOT):
                    <span>{request.reasonNotWithinEightHours ? request.reasonNotWithinEightHours : 'N/A'}</span></p>
                </div>
            </div>
            
            <br />
            <p className='key' style={{textDecoration: 'underline', fontSize: '1.3vw'}}>Authorizing Management Representative:</p>
            <div className="adminFormField">
                <div className="insideField">
                    <p className='key'>Name:</p>
                    <p>{request.managementRepName}</p>
                </div>
                <div className="insideField">
                    <p className='key'>ID Number:</p>
                    <p>{request.managementRepId}</p>
                </div>
                <div className="insideField">
                    <p className='key'>Date:</p>
                    <p>{request.managementRepDate}</p>
                </div>
                <div className="insideField">
                    <p className='key'>Phone Number:</p>
                    <p>{request.managementRepPhone}</p>
                </div>
            </div>
        </div>
    </>
};