

export default function AdminReasonable({request}) {
    const behavior = {
        stumbling: "Stumbling, unsteady gait", 
        drowsy: "Drowsy, sleepy, lethargic", 
        agitated: "Agitated, anxious, restless",
        hostile: "Hostile, belligerent", 
        irritable: "Irritable, moody", 
        depressed: "Depressed, withdrawn", 
        unresponsive: "Unresponsive, distracted",
        clumsy: "Clumsy, uncoordinated", 
        tremors: "Tremors, shakes", 
        fluLike: "Flu-like illness complaints", 
        suspicious: "Suspicious, paranoid",
        hyperactive: "Hyperactive, fidgety", 
        inappropriate: "Inappropriate, uninhibited behavior", 
        inability: "Inability or difficulty doing routine tasks",
        disorientation: "Disorientation or confusion", 
        unsafe: "Unsafe or erratic behavior or action", 
        possessing: "Possessing, dispensing, or using controlled substances or alcohol"
      }
    
    const appearance = {
        flushedComplexion: "Flushed Complexion", 
        excessiveSweating: "Excessive Sweating", 
        coldClammySweats: "Cold, clammy sweats", 
        bloodshotEyes: "Bloodshot eyes", 
        tearyWateryEyes: "Teary, watery eyes",
        dilatedPupils: "Dilated (large) pupils", 
        constrictedPupils: "Constricted (pinpoint) pupils", 
        unfocusedStare: "Unfocused, blank stare", 
        unkemptGrooming: "Unkempt grooming", 
        disheveledClothing: "Disheveled clothing"
    }
    const speech = {
        slurred: "Slurred, thick", 
        incoherent: "Incoherent", 
        exaggeratedEnunciation: "Exaggerated enunciation", 
        loud: "Loud, boisterous", 
        rapid: "Rapid, pressured", 
        excessivelyTalkative: "Excessively talkative",
        nonsensical: "Nonsensical, silly", 
        cursing: "Cursing, verbal abusiveness", 
        inappropriate: "Inappropriate verbal response to questions"
    }
    const bodyOdors = {
        alcohol: "Alcohol", 
        marijuana: "Marijuana"
    }

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
            <div>
                <p className="key title">Reasonable Suspicion/Cause Indicators</p>
                <div className="adminFormField">
                    <div className="insideField">
                        <p className='key'>Behavior:</p>
                        <div className='indicator'>
                            {request.behaviors.length ? request.behaviors.map((b, i) => 
                                <p key={i}>{behavior[b]}</p>
                            ): 'None'}
                        </div>
                    </div>
                    <div className="insideField">
                        <p className='key'>Appaerence:</p>
                        <div className='indicator'>
                            {request.appearance.length ? request.appearance.map((b, i) => 
                                <p key={i}>{appearance[b]}</p>
                            ) : 'None' }
                        </div>
                    </div>
                    <div className="insideField">
                        <p className='key'>Body Odors:</p>
                        <div className='indicator'>
                            {request.bodyOdors.length ? request.bodyOdors.map((b, i) => 
                                <p key={i}>{bodyOdors[b]}</p>
                            ) : 'None'}
                        </div>
                    </div>
                    <div className="insideField">
                        <p className='key'>Speech:</p>
                        <div className='indicator'>
                            {request.speech.length ? request.speech.map((b, i) => 
                                <p key={i}>{speech[b]}</p>
                            ) : 'None'}
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="adminFormField">
                <div className="insideField">
                    <p className='key'>Was the employee on duty at the time of the incident?</p>
                    <p>{request.onDuty ? "Yes" : "No"}</p>
                </div>
            </div>
            <br />
            <div className="adminFormField">
                <div className="insideField">
                    <p className='key'>Event Information:</p>
                    <p>{request.accidentInformation ? request.accidentInformation : "N/A"}</p>
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
                <div className="insideField">
                    <p className='key'>Reason why alcohol testing could not be conducted within 2 hours (DOT ONLY):
                    <span>{request.reasonNotWithinTwoHours ? request.reasonNotWithinTwoHours : 'N/A'}</span></p>
                </div>
                <div className="insideField">
                    <p className='key'>Reason why alcohol testing could not be conducted within 8 hours (DOT AND NONDOT):
                    <span>{request.reasonNotWithinEightHours ? request.reasonNotWithinEightHours : 'N/A'}</span></p>
                </div>
            </div>
            
            <br />
            <p className='key title'>Primary Trained Management Representative:</p>
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
            <br />
            <p className='key' style={{textDecoration: 'underline', fontSize: '1.3vw'}}>Secondary Management Representative:</p>
            <div className="adminFormField">
                <div className="insideField">
                    <p className='key'>Trained:</p>
                    <p>{request.secondaryManagementTrained ? "Trained" : "Not Trained"}</p>
                </div>
                <div className="insideField">
                    <p className='key'>Name:</p>
                    <p>{request.secondaryManagementRepName}</p>
                </div>
                <div className="insideField">
                    <p className='key'>ID Number:</p>
                    <p>{request.secondaryManagementRepId}</p>
                </div>
                <div className="insideField">
                    <p className='key'>Date:</p>
                    <p>{request.secondaryManagementRepDate}</p>
                </div>
                <div className="insideField">
                    <p className='key'>Phone Number:</p>
                    <p>{request.secondaryManagementRepPhone}</p>
                </div>
            </div>
        </div>
    </>
}