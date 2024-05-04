'use client'

import { Button } from '~/components/ui/button'
import * as Text from '~/components/ui/text'
import * as Menu from '~/components/ui/menu'
import { useRouter } from 'next/navigation'

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
  MoonIcon
} from 'lucide-react'

const MainMenu = (props: Menu.RootProps) => {
  const router = useRouter()

  return (
    <Menu.Root {...props}>
      <Menu.Trigger asChild>
        <Button variant="outline" size={props.size}>
          <MenuIcon />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.ItemGroup id="group-1">
            <Menu.Item id="buy" onClick={() => router.push('/buy')}>
              <CirclePlusIcon className="mr-2" /> Buy more credits
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item id="logout" onClick={() => router.push('/login')}>
                <LogOutIcon className="mr-2" />
                Logout
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

export default MainMenu