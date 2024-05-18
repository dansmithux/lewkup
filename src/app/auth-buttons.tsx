'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButtons() {
  const { data: session } = useSession();

  console.log(session);
  return (
    <div>
      {!session ? (
        <button onClick={() => signIn('google')}>Sign in with Google</button>
      ) : (
        <>
          <button onClick={() => signOut()}>Sign out</button>
          <p>Welcome, {session?.user?.name}</p>
        </>
      )}
    </div>
  );
}