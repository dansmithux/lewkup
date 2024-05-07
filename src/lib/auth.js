// // lib/auth.ts
// import { NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: 'jwt',
//   },
//   providers: [
//     CredentialsProvider({
//       // Customize this logic to your needs
//       name: 'Credentials',
//       credentials: {
//         phoneNumber: { label: 'Phone Number', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials) => {
//         const user = { id: 1, name: 'John Doe' }; // Replace with actual user lookup logic
//         return user ? user : null;
//       },
//     }),
//   ],
// };
