import React from 'react';

function toNameCase(str) {

  if (!!str) {
    return str.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
      // Ensures the first character is uppercase
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }).replace(/(\b(?:Mc|Mac)[a-z]+)/g, function(macTxt) {
      // Special case for Irish and Scottish names starting with Mc/Mac
      return macTxt.charAt(0).toUpperCase() + macTxt.substr(1,2).toLowerCase() + macTxt.substr(3).charAt(0).toUpperCase() + macTxt.substr(4);
    }).replace(/(['’][a-z])/g, function(apostropheTxt) {
      // Handles capitalization after apostrophes (O'Connor, D'Artagnan)
      return apostropheTxt.toUpperCase();
    });
  } else {
    return str;
  }

}

function downloadVCard(contact) {
  const { name, phone } = contact;
  const vCardData = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${name}`,
    `TEL:${phone}`,
    'END:VCARD'
  ].join('\n');

  const blob = new Blob([vCardData], { type: 'text/vcard' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'contact.vcf';
  link.click();
}


const PhoneLink = ({ phoneNumber }) => {
    return (
        <a className="text-lg font-bold px-4 py-2 ml-3 border rounded shadow" href={`tel:${phoneNumber}`}>Call {phoneNumber}</a>
    );
};

const MessageLink = ({ phoneNumber }) => {
    return (
        <a className="text-lg font-bold px-4 py-2 ml-3 border rounded shadow" href={`sms:${phoneNumber}`}>Message {phoneNumber}</a>
    );
};


const LookupResultDisplay = ({ result }) => {
  if (!result) return;

  if (!result.valid) return (<h2 className="mt-4">Oops, that doesn't seem to be a valid number. Maybe try a different one?</h2>)

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
          <PhoneLink phoneNumber={result.phoneNumber} />
          <MessageLink phoneNumber={result.phoneNumber} />
          
      </div>
    </>
  );
};

export default LookupResultDisplay;