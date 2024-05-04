import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'

import { ThemeProvider } from 'next-themes'

import Header from './header'
import './global.css'

export const metadata: Metadata = {
  title: 'LewkApp',
  description: "Quickly and easily discover out who's texting you",
  icons: { icon: "../../public/favicon.ico" }
}

import { Noto_Sans } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const noto = Noto_Sans({
  subsets: ['latin'],
  display: 'swap'
})

const RootLayout = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <html lang="en" className={noto.className} suppressHydrationWarning>
      <body className="bg-canvas dark:bg-dark text-dark dark:text-light">
        <ThemeProvider attribute="class">
          <div className="container mx-auto">
            <Header />
            <div className="flex flex-col sm:justify-center sm:items-center pt-24 px-4">
              {children}
            </div>

          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout