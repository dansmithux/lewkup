import MainMenu from './menu'
import Balance from './balance'
import ThemeSwitch from './theme-switch';

const Header = () => {
	return (
		<>
			<div className="w-full fixed top-0">
				<div className="flex items-center justify-between p-4">
  					<div className="min-w-0">
    					<h2 className="text-xl font-bold leading-7 sm:text-2xl">
      						<a href="/">LewkApp</a>
    					</h2>
  					</div>
  					
  					<div className="flex items-center">
  						<Balance />
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