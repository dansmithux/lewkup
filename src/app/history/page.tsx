'use client';

// /history/page.tsx
import { useEffect, useState } from 'react';
import { PhoneCallIcon, ContactIcon, MessageSquareTextIcon, LoaderCircleIcon } from 'lucide-react';

type SearchHistory = {
  id: number;
  phoneNumber: string;
  formattedNumber: string;
  callerName: string;
  callerType: string;
  carrierName: string;
  lineTypeId: string;
  valid: boolean;
  searchTimestamp: string;
};

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
    <a className="mt-2 bg-green-600 hover:bg-green-700 text-white flex text-md font-medium px-4 py-2 border w-full" href={`${type}:${phoneNumber}`}>
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

export default function HistoryPage() {
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const response = await fetch('/api/search-history');
        if (response.ok) {
          const data = await response.json();
          setSearchHistory(data);
        } else {
          setError('Failed to fetch search history');
        }
      } catch (err) {
        setError('Failed to fetch search history');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchHistory();
  }, []);

  if (loading) {
    return (
        <LoaderCircleIcon className="animate-spin h-10 w-10 text-green-600" />
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (searchHistory.length === 0) {
    return <p>You have no search history yet.</p>;
  }

  return (
    <>
      <section>
        {searchHistory.map((entry) => (
          <div className="mb-12 border p-6 rounded-lg shadow-lg sm:w-full max-w-4xl" key={entry.id}>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 md:gap-18 w-full">
              <div className="sm:w-1/2">
                <h2 className="text-3xl font-bold">{entry.formattedNumber}</h2>

                <h2 className="font-light mt-4 uppercase">Caller Name</h2>
                <h3 className="text-2xl">{entry.callerName}</h3>

                <h2 className="font-light mt-4 uppercase">Caller Type</h2>
                <h3 className="text-2xl">{entry.callerType}</h3>

                <h2 className="font-light mt-4 uppercase">Carrier Name</h2>
                <h3 className="text-2xl">{entry.carrierName}</h3>

                <h2 className="font-light mt-4 uppercase">Line Type</h2>
                <h3 className="text-2xl">{lineTypes[entry.lineTypeId]}</h3>
                <p className="sm:max-w-xs">{lineTypeDescriptions[entry.lineTypeId]}</p>
              </div>

              <div className="sm:w-1/2">
                <button className="bg-green-600 hover:bg-green-700 text-white flex text-md font-medium px-4 py-2 border w-full" onClick={() => downloadVCard({ name: entry.callerName , phone: entry.phoneNumber })}>
                  <ContactIcon className="mr-2" />
                  Save to Contacts
                </button>
                <PhoneLink phoneNumber={entry.phoneNumber} formattedNumber={entry.formattedNumber} type="tel" />
                <PhoneLink phoneNumber={entry.phoneNumber} formattedNumber={entry.formattedNumber} type="sms" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
