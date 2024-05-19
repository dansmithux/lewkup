'use client'

import Link from 'next/link'
import Image from 'next/image'
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
    <Menu.Root {...props} size="lg">
      <Menu.Trigger asChild>
        <Button variant="ghost" size={props.size}>
          <MenuIcon />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.ItemGroup id="group-1">
            

            <Menu.Item id="search" onClick={() => router.push('/search')} className="sm:hidden font-semibold">
              <SearchIcon className="mr-2" /> Search
            </Menu.Item>

            <Menu.Item id="history" onClick={() => router.push('/history')} className="sm:hidden font-semibold">
              <HistoryIcon className="mr-2" /> History
            </Menu.Item>
            
            <Menu.Item id="buy" onClick={() => router.push('/credits')} className="sm:hidden font-semibold">
              <CirclePlusIcon className="mr-2" /> Credits
            </Menu.Item>

            <Menu.Separator className="sm:hidden" />

            { !session ? (
              <>
              </>
            ) : (
              <>
                <Menu.ItemGroupLabel htmlFor="">
                  <Image width={20} height={20} src={session?.user?.image} alt="" className="inline mr-2 rounded-full" />
                  <span className="align-middle font-semibold">{session?.user?.name}</span>
                </Menu.ItemGroupLabel>
                
              </>
            )}
            
            
            { !session ? (
              <>
                <Menu.Item id="login" className="font-semibold" onClick={() => signIn('google')}>
                    Log In with Google
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item id="logout" className="font-semibold" onClick={() => signOut()}>
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