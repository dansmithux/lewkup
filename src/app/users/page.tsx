// app/page.tsx
import { prisma } from '../../lib/prisma';

export default async function HomePage() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.phoneNumber}</li>
        ))}
      </ul>
    </div>
  );
}
