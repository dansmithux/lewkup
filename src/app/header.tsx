'use client';

import MainMenu from './menu'
import Balance from './balance'
import ThemeSwitch from './theme-switch';
import { useRouter } from 'next/navigation'
import { Button } from '~/components/ui/button'

const Header = () => {
	const router = useRouter()
	return (
		<>
			<div id="nav-blur" className="w-full fixed top-0 shadow-md dark:border-b backdrop-blur-md bg-white/30 dark:bg-black/30 z-10">
				<div className="flex items-center justify-between p-4 sm:w-full max-w-6xl mx-auto">
  					<div className="min-w-0">

	  					<Button variant="ghost" size="lg" className="text-lg" onClick={() => router.push('/')}>
	          				WhoDiss
	        			</Button>
  					</div>
  					
  					<div className="flex items-center">
  						{/*<Balance />*/}
  						<ThemeSwitch size="lg" />
						<MainMenu size="lg"
						/>
  					</div>
				</div>
			</div>
		</>
	)
}

export default Header