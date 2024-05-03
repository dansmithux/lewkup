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

const LookupResultDisplay = ({ result }) => {
  if (!result) return;

  if (!result.valid) return (<h2 className="mt-4">Oops, that doesn't seem to be a valid number. Maybe try a different one?</h2>)

  return (
    <div className="mt-4">

        <h2>{result.nationalFormat}</h2>

        <h2 className="mt-4">Caller Name</h2>
        <strong>{toNameCase(result.callerName?.caller_name) || "Unknown"}</strong>
        
        <h2 className="mt-4">Caller Type</h2>
        <strong>{toNameCase(result.callerName?.caller_type) || "Unknown"}</strong>
        
        <h2 className="mt-4">Carrier Name</h2>
        <strong>{result.lineTypeIntelligence?.carrier_name || "Unknown"}</strong>
        
        <h2 className="mt-4">Line Type</h2>
        <strong>{toNameCase(result.lineTypeIntelligence?.type) || "Unknown"}</strong>

    </div>
  );
};

export default LookupResultDisplay;