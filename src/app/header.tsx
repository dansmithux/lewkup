'use client';

import MainMenu from './menu'
import Balance from './balance'
import ThemeSwitch from './theme-switch';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { Button } from '~/components/ui/button'
import AuthButtons from "./auth-buttons";

import {
  ChevronRightIcon,
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  SearchIcon,
  MenuIcon,
  ClockIcon,
  CirclePlusIcon,
  SunMoonIcon,
  SunIcon,
  MoonIcon,
  HistoryIcon
} from 'lucide-react'


const Header = () => {
	const router = useRouter()
	return (
		<>
			<div id="nav-blur" className="w-full fixed top-0 shadow-md dark:border-b backdrop-blur-md bg-white/30 dark:bg-black/30 z-10">
				<div className="flex items-center justify-between p-4 sm:w-full max-w-6xl mx-auto">
  					<div className="min-w-0">

	  					<Button variant="ghost" size="md" className="text-lg" onClick={() => router.push('/')}>
	          				WhoDiss
	        			</Button>
  						<ThemeSwitch size="md" />
  					</div>

  					<div className="flex items-center">
						<Button variant="ghost" size="md" className="text-sm hidden sm:flex" onClick={() => router.push('/search')}>
							<SearchIcon className="" /> Search

	        			</Button>
						<Button variant="ghost" size="md" className="text-sm hidden sm:flex" onClick={() => router.push('/history')}>
							<HistoryIcon className="" /> History
	        			</Button>
						<Button variant="ghost" size="md" className="text-sm hidden sm:flex" onClick={() => router.push('/credits')}>
							<CirclePlusIcon className="" /> Credits
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