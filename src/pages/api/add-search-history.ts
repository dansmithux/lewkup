// pages/api/add-search-history.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { authOptions } from './auth/[...nextauth]'; // Adjust the path as needed
import { getServerSession } from 'next-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { phoneNumber, formattedNumber, callerName, callerType, carrierName, lineTypeId, valid } = req.body;

    try {
      const newEntry = await prisma.searchHistory.create({
        data: {
          userId: session.user.id,
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
      console.error('Failed to add search history:', error);
      res.status(500).json({ error: 'Failed to add search history' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
