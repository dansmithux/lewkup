import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';

import Header from './header';
import './global.css';
import SessionProviderWrapper from './session-provider-wrapper';

export const metadata: Metadata = {
  title: 'WhoDiss',
  description: "Quickly and easily discover out who's texting you",
  icons: { icon: "../../public/favicon.ico" },
};

import { Libre_Franklin } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
const noto = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
});

const RootLayout = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <html lang="en" className={noto.className} suppressHydrationWarning>
      <body className="bg-neutral-100 dark:bg-neutral-900 text-dark dark:text-light">
        <ThemeProvider attribute="class">
          <SessionProviderWrapper>
            <div>
              <Header />
              <div className="flex flex-col sm:justify-center sm:items-center pt-36 px-4">
                {children}
              </div>
            </div>
          </SessionProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
