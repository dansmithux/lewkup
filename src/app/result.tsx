import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { PhoneCallIcon, ContactIcon, MessageSquareTextIcon, LoaderCircleIcon } from 'lucide-react';




function toNameCase(str) {
  if (!!str) {
    return str
      .replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      })
      .replace(/(\b(?:Mc|Mac)[a-z]+)/g, function(macTxt) {
        return macTxt.charAt(0).toUpperCase() + macTxt.substr(1,2).toLowerCase() + macTxt.substr(3).charAt(0).toUpperCase() + macTxt.substr(4);
      })
      .replace(/(['’][a-z])/g, function(apostropheTxt) {
        return apostropheTxt.toUpperCase();
      })
      .replace(/(\b[a-z]+),\s*([a-z]+)/gi, function(match, lastName, firstName) {
        return lastName + ', ' + firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
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

const areaCodes = {
  '201': 'New Jersey',
  '202': 'Washington, DC',
  '203': 'Connecticut',
  '205': 'Alabama',
  '206': 'Washington',
  '207': 'Maine',
  '208': 'Idaho',
  '209': 'California',
  '210': 'Texas',
  '212': 'New York',
  '213': 'California',
  '214': 'Texas',
  '215': 'Pennsylvania',
  '216': 'Ohio',
  '217': 'Illinois',
  '218': 'Minnesota',
  '219': 'Indiana',
  '224': 'Illinois',
  '225': 'Louisiana',
  '228': 'Mississippi',
  '229': 'Georgia',
  '231': 'Michigan',
  '234': 'Ohio',
  '239': 'Florida',
  '240': 'Maryland',
  '248': 'Michigan',
  '251': 'Alabama',
  '252': 'North Carolina',
  '253': 'Washington',
  '254': 'Texas',
  '256': 'Alabama',
  '260': 'Indiana',
  '262': 'Wisconsin',
  '267': 'Pennsylvania',
  '269': 'Michigan',
  '270': 'Kentucky',
  '272': 'Pennsylvania',
  '276': 'Virginia',
  '281': 'Texas',
  '301': 'Maryland',
  '302': 'Delaware',
  '303': 'Colorado',
  '304': 'West Virginia',
  '305': 'Florida',
  '307': 'Wyoming',
  '308': 'Nebraska',
  '309': 'Illinois',
  '310': 'California',
  '312': 'Illinois',
  '313': 'Michigan',
  '314': 'Missouri',
  '315': 'New York',
  '316': 'Kansas',
  '317': 'Indiana',
  '318': 'Louisiana',
  '319': 'Iowa',
  '320': 'Minnesota',
  '321': 'Florida',
  '323': 'California',
  '325': 'Texas',
  '330': 'Ohio',
  '331': 'Illinois',
  '334': 'Alabama',
  '336': 'North Carolina',
  '337': 'Louisiana',
  '339': 'Massachusetts',
  '340': 'Virgin Islands',
  '346': 'Texas',
  '347': 'New York',
  '351': 'Massachusetts',
  '352': 'Florida',
  '360': 'Washington',
  '361': 'Texas',
  '385': 'Utah',
  '386': 'Florida',
  '401': 'Rhode Island',
  '402': 'Nebraska',
  '404': 'Georgia',
  '405': 'Oklahoma',
  '406': 'Montana',
  '407': 'Florida',
  '408': 'California',
  '409': 'Texas',
  '410': 'Maryland',
  '412': 'Pennsylvania',
  '413': 'Massachusetts',
  '414': 'Wisconsin',
  '415': 'California',
  '417': 'Missouri',
  '419': 'Ohio',
  '423': 'Tennessee',
  '424': 'California',
  '425': 'Washington',
  '430': 'Texas',
  '432': 'Texas',
  '434': 'Virginia',
  '435': 'Utah',
  '440': 'Ohio',
  '442': 'California',
  '443': 'Maryland',
  '458': 'Oregon',
  '469': 'Texas',
  '470': 'Georgia',
  '475': 'Connecticut',
  '478': 'Georgia',
  '479': 'Arkansas',
  '480': 'Arizona',
  '484': 'Pennsylvania',
  '501': 'Arkansas',
  '502': 'Kentucky',
  '503': 'Oregon',
  '504': 'Louisiana',
  '505': 'New Mexico',
  '507': 'Minnesota',
  '508': 'Massachusetts',
  '509': 'Washington',
  '510': 'California',
  '512': 'Texas',
  '513': 'Ohio',
  '515': 'Iowa',
  '516': 'New York',
  '517': 'Michigan',
  '518': 'New York',
  '520': 'Arizona',
  '530': 'California',
  '531': 'Nebraska',
  '534': 'Wisconsin',
  '539': 'Oklahoma',
  '540': 'Virginia',
  '541': 'Oregon',
  '551': 'New Jersey',
  '559': 'California',
  '561': 'Florida',
  '562': 'California',
  '563': 'Iowa',
  '567': 'Ohio',
  '570': 'Pennsylvania',
  '571': 'Virginia',
  '573': 'Missouri',
  '574': 'Indiana',
  '575': 'New Mexico',
  '580': 'Oklahoma',
  '585': 'New York',
  '586': 'Michigan',
  '601': 'Mississippi',
  '602': 'Arizona',
  '603': 'New Hampshire',
  '605': 'South Dakota',
  '606': 'Kentucky',
  '607': 'New York',
  '608': 'Wisconsin',
  '609': 'New Jersey',
  '610': 'Pennsylvania',
  '612': 'Minnesota',
  '614': 'Ohio',
  '615': 'Tennessee',
  '616': 'Michigan',
  '617': 'Massachusetts',
  '618': 'Illinois',
  '619': 'California',
  '620': 'Kansas',
  '623': 'Arizona',
  '626': 'California',
  '630': 'Illinois',
  '631': 'New York',
  '636': 'Missouri',
  '641': 'Iowa',
  '646': 'New York',
  '650': 'California',
  '651': 'Minnesota',
  '657': 'California',
  '660': 'Missouri',
  '661': 'California',
  '662': 'Mississippi',
  '667': 'Maryland',
  '669': 'California',
  '670': 'Northern Mariana Islands',
  '671': 'Guam',
  '678': 'Georgia',
  '681': 'West Virginia',
  '682': 'Texas',
  '684': 'American Samoa',
  '701': 'North Dakota',
  '702': 'Nevada',
  '703': 'Virginia',
  '704': 'North Carolina',
  '706': 'Georgia',
  '707': 'California',
  '708': 'Illinois',
  '712': 'Iowa',
  '713': 'Texas',
  '714': 'California',
  '715': 'Wisconsin',
  '716': 'New York',
  '717': 'Pennsylvania',
  '718': 'New York',
  '719': 'Colorado',
  '720': 'Colorado',
  '724': 'Pennsylvania',
  '725': 'Nevada',
  '727': 'Florida',
  '731': 'Tennessee',
  '732': 'New Jersey',
  '734': 'Michigan',
  '737': 'Texas',
  '740': 'Ohio',
  '747': 'California',
  '754': 'Florida',
  '757': 'Virginia',
  '760': 'California',
  '762': 'Georgia',
  '763': 'Minnesota',
  '765': 'Indiana',
  '769': 'Mississippi',
  '770': 'Georgia',
  '772': 'Florida',
  '773': 'Illinois',
  '774': 'Massachusetts',
  '775': 'Nevada',
  '779': 'Illinois',
  '781': 'Massachusetts',
  '785': 'Kansas',
  '786': 'Florida',
  '787': 'Puerto Rico',
  '801': 'Utah',
  '802': 'Vermont',
  '803': 'South Carolina',
  '804': 'Virginia',
  '805': 'California',
  '806': 'Texas',
  '808': 'Hawaii',
  '810': 'Michigan',
  '812': 'Indiana',
  '813': 'Florida',
  '814': 'Pennsylvania',
  '815': 'Illinois',
  '816': 'Missouri',
  '817': 'Texas',
  '818': 'California',
  '828': 'North Carolina',
  '830': 'Texas',
  '831': 'California',
  '832': 'Texas',
  '843': 'South Carolina',
  '845': 'New York',
  '847': 'Illinois',
  '848': 'New Jersey',
  '850': 'Florida',
  '856': 'New Jersey',
  '857': 'Massachusetts',
  '858': 'California',
  '859': 'Kentucky',
  '860': 'Connecticut',
  '862': 'New Jersey',
  '863': 'Florida',
  '864': 'South Carolina',
  '865': 'Tennessee',
  '870': 'Arkansas',
  '872': 'Illinois',
  '878': 'Pennsylvania',
  '901': 'Tennessee',
  '903': 'Texas',
  '904': 'Florida',
  '906': 'Michigan',
  '907': 'Alaska',
  '908': 'New Jersey',
  '909': 'California',
  '910': 'North Carolina',
  '912': 'Georgia',
  '913': 'Kansas',
  '914': 'New York',
  '915': 'Texas',
  '916': 'California',
  '917': 'New York',
  '918': 'Oklahoma',
  '919': 'North Carolina',
  '920': 'Wisconsin',
  '925': 'California',
  '928': 'Arizona',
  '929': 'New York',
  '931': 'Tennessee',
  '936': 'Texas',
  '937': 'Ohio',
  '938': 'Alabama',
  '939': 'Puerto Rico',
  '940': 'Texas',
  '941': 'Florida',
  '947': 'Michigan',
  '949': 'California',
  '951': 'California',
  '952': 'Minnesota',
  '954': 'Florida',
  '956': 'Texas',
  '970': 'Colorado',
  '971': 'Oregon',
  '972': 'Texas',
  '973': 'New Jersey',
  '978': 'Massachusetts',
  '979': 'Texas',
  '980': 'North Carolina',
  '984': 'North Carolina',
  '985': 'Louisiana',
  '989': 'Michigan'
}

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
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const saveToDatabase = async () => {
      if (result && result.valid && session) {

        const userId = session?.user?.id;
        const phoneNumber = result.phoneNumber;
        const formattedNumber = result.nationalFormat;
        const callerName = toNameCase(result.callerName?.caller_name) || "Unknown";
        const callerType = toNameCase(result.callerName?.caller_type) || "Unknown";
        const carrierName = result.lineTypeIntelligence?.carrier_name || "Unknown";
        const lineTypeId = result.lineTypeIntelligence?.type;

        try {

          await fetch('/api/add-search-history', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              phoneNumber,
              formattedNumber,
              callerName,
              callerType,
              carrierName,
              lineTypeId,
              valid: result.valid,
            }),
          });

        } catch (error) {
          console.error('Failed to save search history:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    saveToDatabase();
  }, [result]);



  if (!result) return null;

  if (!result.valid) return (<h2 className="mt-12 text-2xl"><span className="font-bold">{result.phoneNumber}</span> doesn't seem to be valid. Please try a different number.</h2>);

  if (loading) {
    return (
      <>
        <div className="sm:w-full max-w-3xl">
          <div className="flex justify-center">
            <LoaderCircleIcon className="flex animate-spin h-10 w-10 text-green-600 mt-12" />
          </div>
        </div>
      </>
    );
  }

  const phoneNumber = result.phoneNumber;
  const formattedNumber = result.nationalFormat;
  const areaCode = result.phoneNumber.toString().slice(2, 5);
  const originState = areaCodes[areaCode] || "";
  const callerName = toNameCase(result.callerName?.caller_name) || "Unknown";
  const callerType = toNameCase(result.callerName?.caller_type) || "Unknown";
  const carrierName = result.lineTypeIntelligence?.carrier_name || "Unknown";
  const lineTypeId = result.lineTypeIntelligence?.type;
  
  const lineType = lineTypes[lineTypeId];
  const lineTypeDescription = lineTypeDescriptions[lineTypeId];

  const sharedButtonClasses = "button button--variant_outline button--size_lg w-full justify-start"

  const PhoneLink = ({ phoneNumber, formattedNumber, type }) => {
    return (
      <a className={`${sharedButtonClasses} + mt-4`} href={`${type}:${phoneNumber}`}>
        { type === "tel"
          ? <PhoneCallIcon className="mr-2" />
          : <MessageSquareTextIcon className="mr-2" />
        }
        { type === "tel" ? "Call" : "Message"} {formattedNumber}
      </a>
    );
  };

  return (
    <>
        <div className="my-16 border p-6 rounded-lg shadow-lg sm:w-full max-w-3xl hover:shadow-xl transition">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 md:gap-18 w-full">
            <div className="sm:w-1/2">
              <h2 className="text-3xl font-bold">{formattedNumber}</h2>


              <h2 className="font-light mt-4 uppercase">Caller Name</h2>
              <h3 className="text-2xl">{callerName}</h3>

              <h2 className="font-light mt-4 uppercase">Caller Type</h2>
              <h3 className="text-2xl">{callerType}</h3>

              <h2 className="font-light mt-4 uppercase">Area Code State</h2>
              <h3 className="text-2xl">{originState}</h3>

              <h2 className="font-light mt-4 uppercase">Carrier Name</h2>
              <h3 className="text-2xl">{carrierName}</h3>

              <h2 className="font-light mt-4 uppercase">Line Type</h2>
              <h3 className="text-2xl">{lineType}</h3>
              <p className="sm:max-w-xs">{lineTypeDescription}</p>
            </div>

            <div className="sm:w-1/2">
                <button className={`${sharedButtonClasses}`} onClick={() => downloadVCard({ name: callerName , phone: phoneNumber })}>
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
