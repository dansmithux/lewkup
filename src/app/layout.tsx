import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'

import { ThemeProvider } from 'next-themes'

import Header from './header'
import './global.css'

export const metadata: Metadata = {
  title: 'LewkApp',
  description: "Quickly and easily figure out who's texting you",
  icons: { icon: "../../public/favicon.ico" }
}

const RootLayout = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-canvas dark:bg-dark text-dark dark:text-light">
        <ThemeProvider attribute="class">
          <div className="container mx-auto h-screen flex flex-col justify-center items-center">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout