import React from 'react';


const LookupHistory = ({ result }) => {

  const callerName = toNameCase(result.callerName?.caller_name) || "Unknown";

  return (
    <>
      <div className="mt-4">

          <h2>{result.nationalFormat}</h2>

          <h2 className="mt-4">Caller Name</h2>
          <strong>{callerName}</strong>
          
          <h2 className="mt-4">Caller Type</h2>
          <strong>{toNameCase(result.callerName?.caller_type) || "Unknown"}</strong>
          
          <h2 className="mt-4">Carrier Name</h2>
          <strong>{result.lineTypeIntelligence?.carrier_name || "Unknown"}</strong>
          
          <h2 className="mt-4">Line Type</h2>
          <strong>{result.lineTypeIntelligence?.type || "Unknown"}</strong>

      </div>
      <div>
      
          <button className="text-lg font-bold px-4 py-2 ml-3 border rounded shadow" onClick={() => downloadVCard({ name: callerName , phone: result.phoneNumber })}>
            Save Contact
          </button>
          <PhoneLink phoneNumber={result.phoneNumber} type="tel" />
          <PhoneLink phoneNumber={result.phoneNumber} type="sms" />
          
      </div>
    </>
  );

};

export default LookupHistoryDisplay;