'use client';

import MainMenu from './menu'
import ThemeSwitch from './theme-switch';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Button } from '~/components/ui/button'

import {
  ChevronRightIcon,
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  SearchIcon,
  MenuIcon,
  ClockIcon,
  CoinsIcon,
  SunMoonIcon,
  SunIcon,
  MoonIcon,
  HistoryIcon
} from 'lucide-react'


const Header = () => {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<>
			<div id="nav-blur" className="w-full fixed top-0 shadow-md dark:border-b backdrop-blur-md bg-white/30 dark:bg-black/30 z-10">
				<div className="flex items-center justify-between p-4 sm:w-full max-w-6xl mx-auto">
  					<div className="min-w-0">

	  					<Button variant="ghost" size="md" className="text-lg" onClick={() => router.push('/')}>
	          				Lewk.App
	        			</Button>
  						<ThemeSwitch size="md" />
  					</div>

  					<div className="flex items-center">
						<Button variant="ghost" size="md" className="text-sm hidden sm:flex" onClick={() => router.push('/search')}>
							<SearchIcon className="" /> <span className={`${pathname === '/search' ? 'underline' : '' }`}>Search</span>
      			</Button>
						<Button variant="ghost" size="md" className="text-sm hidden sm:flex" onClick={() => router.push('/history')}>
							<HistoryIcon className="" /> <span className={`${pathname === '/history' ? 'underline' : '' }`}>History</span>
	        			</Button>
						<Button variant="ghost" size="md" className="text-sm hidden sm:flex" onClick={() => router.push('/credits')}>
							<CoinsIcon className="" /> <span className={`${pathname === '/credits' ? 'underline' : '' }`}>Credits</span>
      			</Button>
						<MainMenu size="md"
						/>
  					</div>
				</div>
			</div>
		</>
	)
}

export default Header