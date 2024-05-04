import { useState, useRef } from 'react';
import { PatternFormat } from 'react-number-format';
import LookupResultDisplay from './result';

// `phoneNumber` will be the parsed phone number in E.164 format. Example: "+12133734253".
function PhoneNumberSearch() {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [lookupResult, setLookupResult] = useState(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

 const fetchData = async (phoneNumber, callback) => {
    try {
      const response = await fetch('/api/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        callback(null, data); // Call the callback with no error and the data
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      callback(error, null); // Call the callback with error
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(phoneNumber);

    if (phoneNumber.length < 10) {
      searchInputRef.current?.focus();
      return;
    }

    // Use the fetchData function with a callback to handle the result
    fetchData(phoneNumber, (err, data) => {
      if (err) {
        console.error(err);
        setLookupResult(null); // Handle error
      } else {
        setLookupResult(data); // Update state with the fetched data
        setPhoneNumber('');
      }
    });
  };


  const handlePhoneNumberChange = (values) => {
    const { formattedValue, value } = values;
    // Update the state with the new value
    setPhoneNumber(value);
  };


  return (
    <>
        <div className="flex flex-col md:flex-row justify-center items-center ">
          <form onSubmit={handleSearch} autoComplete="off">

            <PatternFormat
              allowEmptyFormatting
              className="text-2xl px-4 py-2 border shadow w-full md:w-auto text-center rounded"
              format="+1 (###) ###-####"
              mask="_"
              value={phoneNumber}
              onValueChange={handlePhoneNumberChange}
              valueIsNumericString={true}
              type="tel"
              getInputRef={searchInputRef}
            />
            <button
                className="bg-green-600 hover:bg-green-700 text-white text-2xl font-semibold px-4 py-2 border shadow w-full md:w-auto rounded"
                type="submit"
            >
              Search
            </button>
          </form>
        </div>
        <LookupResultDisplay result={lookupResult} />

    </>
  )
}

export default PhoneNumberSearch;