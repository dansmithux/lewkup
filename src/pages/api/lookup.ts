import type { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio';

type ResponseData = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {

      // Your Twilio credentials
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;

      const { phoneNumber } = req.body;

      if (!phoneNumber) {
        return res.status(400).json({ message: 'Phone number is required' });
      }
      
      // Initialize Twilio client
      const client = twilio(accountSid, authToken);

      const lookup = await client.lookups.v2.phoneNumbers(phoneNumber)
        .fetch({fields: 'caller_name,line_type_intelligence'})
        .then(data => res.status(200).json(data));

      return;

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  } else {
    // If the request is not a POST, return method not allowed
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}