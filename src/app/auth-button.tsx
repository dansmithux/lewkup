'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '~/components/ui/button'


export default function AuthButtons() {
  const { data: session } = useSession();

  console.log(session);
  return (
    <div>
      {!session ? (
        <Button className="mt-8" size="xl" onClick={() => signIn('google')}>Sign in with Google</Button>
      ) : (
        <>
          <Button className="mt-8" size="xl" onClick={() => signOut()}>Sign out</Button>
        </>
      )}
    </div>
  );
}
