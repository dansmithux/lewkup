'use client'

import { signIn, signOut, useSession } from 'next-auth/react';

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
  MoonIcon,
  HistoryIcon
} from 'lucide-react'

const MainMenu = (props: Menu.RootProps) => {
  const router = useRouter()
  const { data: session } = useSession();

  return (
    <Menu.Root {...props}>
      <Menu.Trigger asChild>
        <Button variant="ghost" size={props.size}>
          <MenuIcon />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.ItemGroup id="group-1">
            

            <Menu.Item id="search" onClick={() => router.push('/')}>
              <SearchIcon className="mr-2" /> Search
            </Menu.Item>

            <Menu.Item id="history" onClick={() => router.push('/history')}>
              <HistoryIcon className="mr-2" /> History
            </Menu.Item>
            
            <Menu.Item id="buy" onClick={() => router.push('/credits')}>
              <CirclePlusIcon className="mr-2" /> Buy Credits
            </Menu.Item>

            <Menu.Separator />

            { !session ? (
              <>
              </>
            ) : (
              <>
                <Menu.ItemGroupLabel htmlFor="">Hi, {session?.user?.name}</Menu.ItemGroupLabel>
              </>
            )}
            
            
            { !session ? (
              <>
                <Menu.Item id="login" onClick={() => signIn('google')}>
                    Log In with Google
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item id="logout" onClick={() => signOut()}>
                  <LogOutIcon className="mr-2" />
                  Log Out
                </Menu.Item>
              </>
            )}

          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

export default MainMenu