"use client";

import { Button, ButtonProps } from '~/components/ui/button';
import { useRouter } from 'next/navigation';

const Balance = (props: ButtonProps) => {
    const router = useRouter();

    return (
        <>
            <Button variant="ghost" size="xs" className="rounded-full" onClick={() => router.push('/buy')}>
                2 credits
            </Button>
        </>
    )
	
}

export default Balance