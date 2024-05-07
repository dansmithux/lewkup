'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  CreditCardIcon,
  CirclePlusIcon
} from 'lucide-react'

const Payment = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <div className="">
        <Button variant="outline" size="lg">
            <CirclePlusIcon className="mr-2" /> Buy 3 credits for $1
        </Button>
      </div>
      <div className="">
        <Button variant="outline" size="lg">
            <CirclePlusIcon className="mr-2" /> Buy 10 credits for $2
        </Button>
      </div>
      <div className="">
        <Button variant="outline" size="lg">
            <CirclePlusIcon className="mr-2" /> Buy 50 credits for $5
        </Button>
      </div>
    </div>
  );
}

export default Payment;
