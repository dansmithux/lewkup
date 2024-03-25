import MainMenu from './menu'
import Balance from './balance'
import ThemeToggle from './theme-toggle';
import ThemeSwitch from './theme-switch';

const Header = () => {
	return (
		<>
			<div className="container mx-auto w-full fixed top-0">
				<div className="flex items-center justify-between p-4">
  					<div className="min-w-0">
    					<h2 className="text-2xl font-bold leading-7 sm:text-3xl sm:tracking-tight">
      						<a href="/">LewkApp</a>
    					</h2>
  					</div>
  					
  					<div className="flex items-center">
  						<ThemeSwitch
  							className="px-4"
  						/>
  						<Balance
  							className="mx-4"
  						/>
						<MainMenu
							size="xl"
						/>
  					</div>
				</div>
			</div>
		</>
	)
}

export default Header