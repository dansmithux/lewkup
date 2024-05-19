'use client';

import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { LoaderCircleIcon, CoinsIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';

import {
  CreditCardIcon,
  CirclePlusIcon
} from 'lucide-react'

export default function CreditBalancePage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
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
      setButtonLoading(true);
      const response = await fetch('/api/add-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        const data = await response.json();
        setButtonLoading(false);
        setBalance(data.balance);
      } else {
        setError('Failed to add credit');
        setButtonLoading(false);
      }
    } catch (err) {
      setError('Failed to add credit');
      setButtonLoading(false);
    }
  };

  function Loading() {
    return (<LoaderCircleIcon className="animate-spin h-10 w-10 text-green-600" />);
  }

  if (loading) {
    return (
      <div className="sm:w-full max-w-3xl">
        <div className="flex justify-center">
          <Loading />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <>
        <h2 className="text-xl">You must be logged in to view your credit balance.</h2>
        <Button className="mt-8" size="xl" onClick={() => signIn('google')}>Sign in with Google</Button>
      </>
    )
  }

  return (


    <div className="mb-16 border py-14 rounded-lg shadow-lg sm:w-full max-w-3xl hover:shadow-xl transition">
      <div className="flex flex-col sm:flex-row  w-full items-center justify-center">

        <div className="sm:w-1/2">
          <div className="text-center border-b sm:border-b-0 pb-10 sm:pb-0 sm:border-r sm:pr-100">
            <h2 className="text-md font-light mb-7 uppercase">Balance</h2>
            <p className="text-6xl mb-1 font-bold">{ balance !== null ? balance : "0 "}</p>
            <p className="text-lg font-medium">Credits</p>
          </div>
        </div>

        <div className="sm:w-1/2">

          <div className="flex flex-col gap-2 sm:gap-2 md:gap-4 items-center align-center pt-10 sm:pt-0">

            <div className="">
              <Button variant="ghost" disabled={buttonLoading} size="lg" onClick={() => addCredits(3)}>
                <CoinsIcon className="mr-2" />
                Buy 3 Credits for $1
              </Button>
            </div>
            <div className="">
              <Button variant="ghost" disabled={buttonLoading} size="lg" onClick={() => addCredits(10)}>
                <CoinsIcon className="mr-2" />
                Buy 10 Credits for $2
              </Button>
            </div>
            <div className="">
              <Button variant="ghost" disabled={buttonLoading} size="lg" onClick={() => addCredits(50)}>
                <CoinsIcon className="mr-2" />
                Buy 50 Credits for $5
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
