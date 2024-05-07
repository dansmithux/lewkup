// pages/api/search-history.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const session = await getServerSession(req, res, authOptions);

  // if (!session?.user?.id) {
  //   res.status(401).json({ error: 'Unauthorized' });
  //   return;
  // }

  try {
    const searchHistory = await prisma.searchHistory.findMany({
      // where: { userId: session.user.id },
      where: { userId: 1 },
      orderBy: { searchTimestamp: 'desc' },
    });
    res.status(200).json(searchHistory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
}
