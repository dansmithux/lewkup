import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]'; // Adjust the path as needed
import { PrismaClient } from '@prisma/client';

// import {loadStripe} from '@stripe/stripe-js';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  // const stripe = await loadStripe(process.env.STRIPE_SECRET);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { quantity, price } = req.body;

  if (!quantity || typeof quantity !== 'number') {
    return res.status(400).json({ error: 'Invalid quantity' });
  }

  try {
    const userCreditBalance = await prisma.userCreditBalance.upsert({
      where: { userId: session.user.id },
      update: { balance: { increment: quantity } },
      create: {
        userId: session.user.id,
        balance: quantity,
      },
    });

    // Insert a record into the Credits table
    await prisma.credits.create({
      data: {
        userId: session.user.id,
        credits: quantity,
        price: price,
      },
    });

    res.status(200).json({ balance: userCreditBalance.balance });
  } catch (error) {
    console.error('Failed to add credit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
