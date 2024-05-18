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
    const userCreditBalance = await prisma.userCreditBalance.findUnique({
      where: { userId: session.user.id },
    });

    if (!userCreditBalance) {
      return res.status(404).json({ error: 'User credit balance not found' });
    }

    res.status(200).json({ balance: userCreditBalance.balance });
  } catch (error) {
    console.error('Failed to fetch credit balance:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
