// pages/api/add-search-history.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, phoneNumber, formattedNumber, callerName, callerType, carrierName, lineTypeId, valid } = req.body;

    try {
      const newEntry = await prisma.searchHistory.create({
        data: {
          userId,
          phoneNumber,
          formattedNumber,
          callerName,
          callerType,
          carrierName,
          lineTypeId,
          valid,
        },
      });
      res.status(201).json(newEntry);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add search history' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
