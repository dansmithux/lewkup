'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { MenuIcon, SunIcon, MoonIcon, SunMoonIcon } from 'lucide-react';

import { Button } from '~/components/ui/button'
import * as Text from '~/components/ui/text'
import * as Menu from '~/components/ui/menu'


const ThemeSwitch = (props: Menu.RootProps) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Menu.Root {...props}>
      <Menu.Trigger asChild>
        <Button variant="ghost" size={props.size}>
          { theme === "system" ? <SunMoonIcon /> : "" }
          { theme === "light" ? <SunIcon /> : "" }
          { theme === "dark" ? <MoonIcon /> : "" }
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.ItemGroup id="group-1">
            <Menu.Item id="system" onClick={() => setTheme("system")}>
              <SunMoonIcon className="mr-2" /> System
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item id="light" onClick={() => setTheme("light")}>
              <SunIcon className="mr-2" /> Light
            </Menu.Item>
            <Menu.Item id="dark" onClick={() => setTheme("dark")}>
              <MoonIcon className="mr-2" /> Dark
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

export default ThemeSwitch