import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]'; // Adjust the path as needed
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const creditPurchaseHistory = await prisma.credits.findMany({
      where: { userId: session.user.id },
      orderBy: {
        purchaseDate: 'desc'
      }
    });

    if (!creditPurchaseHistory) {
      return res.status(404).json({ error: 'User credit purchase history not found' });
    }

    res.status(200).json({ creditPurchaseHistory: creditPurchaseHistory });
  } catch (error) {
    console.error('Failed to fetch credit balance:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
