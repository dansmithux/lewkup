import { useState, useRef } from 'react';
import { PatternFormat } from 'react-number-format';
import { Button } from '~/components/ui/button'
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

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    let paste = event.clipboardData.getData('text');
    paste = paste.replace(/\D+/g, ''); // Remove non-digits
    if (paste.startsWith('1')) {
      paste = paste.substring(1); // Remove the leading '1' if present
    }
    let phoneNumber = paste;
    setPhoneNumber(phoneNumber);
  };

  return (
    <>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <form onSubmit={handleSearch} autoComplete="off">

            <PatternFormat
              allowEmptyFormatting
              className="input input--size_2xl flex text-center"
              format="+1 (###) ###-####"
              mask="_"
              value={phoneNumber}
              onValueChange={handlePhoneNumberChange}
              onPaste={handlePaste}
              valueIsNumericString={true}
              type="tel"
              getInputRef={searchInputRef}
            />
            <Button variant="solid" size="2xl" className="w-full mt-2" type="submit">
              Search
            </Button>
          </form>
        </div>
        <LookupResultDisplay result={lookupResult} />

    </>
  )
}

export default PhoneNumberSearch;