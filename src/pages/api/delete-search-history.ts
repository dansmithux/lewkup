// pages/api/add-search-history.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { authOptions } from './auth/[...nextauth]'; // Adjust the path as needed
import { getServerSession } from 'next-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.body;

    try {
      const deleteHistoryEntry = await prisma.searchHistory.delete({
        where: {
          id: id
        },
      });
      res.status(200).json(deleteHistoryEntry);
    } catch (error) {
      console.error('Failed to delete search history entry:', error);
      res.status(500).json({ error: 'Failed to delete search history entry' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
