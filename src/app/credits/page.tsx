'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { LoaderCircleIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  CreditCardIcon,
  CirclePlusIcon
} from 'lucide-react'

export default function CreditBalancePage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    const fetchCreditBalance = async () => {
      try {
        const response = await fetch('/api/get-credit-balance');
        if (response.ok) {
          const data = await response.json();
          setBalance(data.balance);
        } else {
          setError('Failed to fetch credit balance');
        }
      } catch (err) {
        setError('Failed to fetch credit balance');
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchCreditBalance();
    } else {
      setLoading(false);
    }
  }, [session]);

  const addCredits = async (quantity: number) => {
    try {
      const response = await fetch('/api/add-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
      } else {
        setError('Failed to add credit');
      }
    } catch (err) {
      setError('Failed to add credit');
    }
  };


  if (loading) {
    return (
      <div className="sm:w-full max-w-4xl">
        <div className="flex justify-center">
          <LoaderCircleIcon className="animate-spin h-10 w-10 text-green-600" />
        </div>
      </div>
    );
  }

  if (!session) {
    return <p>You must be logged in to view your credit balance.</p>;
  }

  // if (error) {
  //   return <p>{error}</p>;
  // }

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="text-center pb-8 border-b">
        <h2 className="text-xl">Balance:</h2>
        <p className="text-2xl">{balance !== null ? balance + " Credits" : 'No Credits Available'}</p>
      </div>
      <div className="mt-6">
        <Button variant="ghost" size="lg" onClick={() => addCredits(3)}>
            <CirclePlusIcon className="mr-2" /> Buy 3 Credits for $1
        </Button>
      </div>
      <div className="">
        <Button variant="ghost" size="lg" onClick={() => addCredits(10)}>
            <CirclePlusIcon className="mr-2" /> Buy 10 Credits for $2
        </Button>
      </div>
      <div className="">
        <Button variant="ghost" size="lg" onClick={() => addCredits(50)}>
            <CirclePlusIcon className="mr-2" /> Buy 50 Credits for $5
        </Button>
      </div>
    </div>
  );
}
