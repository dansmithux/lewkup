import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]'; // Adjust the path as needed
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.id) {
      console.error('Unauthorized')
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const searchHistories = await prisma.searchHistory.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        searchTimestamp: 'desc'
      }
    });

    res.status(200).json(searchHistories);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
