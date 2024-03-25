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
            <Menu.Item id="search" onClick={() => router.push('/search')}>
              <SearchIcon className="mr-2" />
                New search
            </Menu.Item>
            <Menu.Item id="buy" onClick={() => router.push('/buy')}>
              <CirclePlusIcon className="mr-2" /> Buy more credits
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item id="history" onClick={() => router.push('/history')}>
              <ClockIcon className="mr-2" /> History
            </Menu.Item>
            <Menu.Item id="billing" onClick={() => router.push('/billing')}>
              <CreditCardIcon className="mr-2" /> Billing
            </Menu.Item>

            <Menu.Root positioning={{ placement: 'right-start', gutter: 2 }} {...props}>
              <Menu.TriggerItem>
                <SunMoonIcon className="mr-2" /> Theme <ChevronRightIcon className="ml-auto" />
              </Menu.TriggerItem>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item id="light">
                      <SunIcon className="mr-2" /> Light
                  </Menu.Item>
                  <Menu.Item id="dark">
                      <MoonIcon className="mr-2" /> Dark
                  </Menu.Item>
                  <Menu.Separator />
                  <Menu.Item id="system">
                      <SunMoonIcon className="mr-2" /> System
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
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