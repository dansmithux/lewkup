import React from 'react';

import {
  PhoneCallIcon,
  ContactIcon,
  MessageSquareTextIcon
} from 'lucide-react'


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

const PhoneLink = ({ phoneNumber, formattedNumber, type }) => {
  return (
      <a className="bg-green-600 hover:bg-green-700 text-white text-md font-medium px-4 py-2 border rounded w-full mt-3 flex" href={`${type}:${phoneNumber}`}>
        { type === "tel"
          ? <PhoneCallIcon className="mr-2" />
          : <MessageSquareTextIcon className="mr-2" />
        }
        { type === "tel" ? "Call" : "Message"} {formattedNumber}
      </a>
  );
};


const lineTypes = {
  landline : "Landline",
  mobile : "Mobile",
  fixedVoip : "Fixed VoIP",
  nonFixedVoip : "Non-fixed VoIP",
  personal : "Personal",
  tollFree : "Toll-free",
  premium : "Premium",
  sharedCost : "Shared Cost",
  uan : "UAN",
  voicemail : "Voicemail",
  pager : "Pager",
  unknown : "Unknown"  
}

const lineTypeDescriptions = {
  landline : "The phone number is a landline number; generally not capable of receiving SMS messages.",
  mobile : "The phone number is a mobile number; generally capable of receiving SMS messages.",
  fixedVoip : "A virtual phone number associated with a physical device (e.g., Comcast or Vonage).",
  nonFixedVoip : "A virtual phone number that can be obtained on the internet without the need for a physical device (e.g., Google Voice or Enflick).",
  personal : "A phone number designated for personal use.",
  tollFree : "A toll-free phone number, which is one where calls are free for the calling party.",
  premium : "A premium rate phone number, which typically charges higher than normal rates for special services.",
  sharedCost : "A shared cost phone number, which is one where the charge is partially paid by the calling party and charges higher than normal rates.",
  uan : "A universal access number, which is a national number which can route incoming calls to different destinations.",
  voicemail : "A phone number associated with a voicemail service.",
  pager : "A phone number associated with a pager device.",
  unknown : "A valid phone number, but the line type could not be determined."
}



const LookupResultDisplay = ({ result }) => {
  if (!result) return;

  if (!result.valid) return (<h2 className="mt-12 text-2xl"><span className="font-bold">{result.phoneNumber}</span> doesn't seem to be valid. Please a different number.</h2>)

  const phoneNumber = result.phoneNumber;
  const formattedNumber = result.nationalFormat;
  const callerName = toNameCase(result.callerName?.caller_name) || "Unknown";
  const callerType = toNameCase(result.callerName?.caller_type) || "Unknown";
  const carrierName = result.lineTypeIntelligence?.carrier_name || "Unknown";
  const lineTypeId = result.lineTypeIntelligence?.type;
  const lineType = lineTypes[lineTypeId];
  const lineTypeDescription = lineTypeDescriptions[lineTypeId];

  return (
    <>
      <div className="my-12 max-w-4xl border p-6 rounded shadow-lg">

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 md:gap-18">

          <div className="">

            <h2 className="text-3xl font-bold">{formattedNumber}</h2>

            <h2 className="font-light mt-4 uppercase">Caller Name</h2>
            <h3 className="text-2xl">{callerName}</h3>
            
            <h2 className="font-light mt-4 uppercase">Caller Type</h2>
            <h3 className="text-2xl">{callerType}</h3>
            

            <h2 className="font-light mt-4 uppercase">Carrier Name</h2>
            <h3 className="text-2xl">{carrierName}</h3>
            
            <h2 className="font-light mt-4 uppercase">Line Type</h2>
            <h3 className="text-2xl">{lineType}</h3>
            <p className="sm:max-w-xs">{lineTypeDescription}</p>

          </div>

          <div className="">
              <button className="bg-green-600 hover:bg-green-700 text-white flex text-md font-medium px-4 py-2 border rounded w-full" onClick={() => downloadVCard({ name: callerName , phone: phoneNumber })}>
                <ContactIcon className="mr-2" />
                Save to Contacts
              </button>
              <PhoneLink phoneNumber={phoneNumber} formattedNumber={formattedNumber} type="tel" />
              <PhoneLink phoneNumber={phoneNumber} formattedNumber={formattedNumber} type="sms" />
          </div>

        </div>


      </div>
    </>
  );
};

export default LookupResultDisplay;