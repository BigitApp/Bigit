import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Link from 'next/link'
import { Fragment, useMemo } from 'react'

import { Container } from './Container'
import { NavLink } from './NavLink'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import logo from '@/public/logo.svg'
import logoText from "@/public/logoText.svg";
import { ConnectWallet, useConnectionStatus } from '@thirdweb-dev/react'
import { lightTheme } from "@thirdweb-dev/react";


const customLightTheme = lightTheme({
  fontFamily: "Inter, sans-serif",
  colors: {
    modalBg: "#F2F2F2",
    accentText: "rgb(47, 147, 22)",
    // accentButtonBg: "rgb(47, 147, 22)",
    accentButtonText: "#fdfcfd",
    primaryButtonBg: "#F2F2F2",
    borderColor: "#e4e2e4",
    separatorLine: "#e4e2e4",
    primaryText: "#1a1523",
    secondaryText: "#706f78",
    secondaryButtonBg: "#e9e8ea",
    connectedButtonBg: "#F2F2F2",
    connectedButtonBgHover: "#F2F2F2",
    primaryButtonText: "#1a1523",
    walletSelectorButtonHoverBg:
      "#F2F2F2",
  },
});

function MobileNavLink({
  href,
  target,
  children,
}: {
  href: string
  target?: string
  children: React.ReactNode
}) {
  return (
    <Popover.Button
      as={Link}
      href={href}
      target={target || '_self'}
      className="block w-full p-2"
    >
      {children}
    </Popover.Button>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0'
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0'
        )}
      />
    </svg>
  )
}

const useHeaders = () => {
  const { t } = useTranslation('common')

  const HEADER_LINKS: Array<{ href: string; label: string; target?: string }> =
    useMemo(
      () => [
        {
          href: '/market',
          label: 'Market',
        },
        {
          href: '/myBot',
          label: 'My Bot',
        },
        {
          href: '/myBotNft',
          label: 'My Bot NFT',
        },
        {
          href: 'https://docs.bigitapp.com/',
          label: 'WhitePaper',
          target: '_blank',
          rel: 'noopener noreferrer'
        },
      ],
      [t]
    )
  return HEADER_LINKS
}

function MobileNavigation() {
  const HEADER_LINKS = useHeaders()
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
          >
            {HEADER_LINKS.map(({ href, label, target }) => (
              <MobileNavLink key={label} href={href} target={target}>
                {label}
              </MobileNavLink>
            ))}
            <hr className="m-2 border-slate-300/40" />
            {/* <MobileNavLink href="/login">Sign in</MobileNavLink> */}
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

export function Header() {
  const HEADER_LINKS = useHeaders()
  const status = useConnectionStatus()
  const isConnected = status === 'connected'

  return (
    <header style={{ height: '80px' }} className="bg-gray-900 fixed top-0 w-full z-50">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-20">
            <Link className="py-3" href="/">
              <Image className="inline-block align-middle" alt="logo" height={40} src={logo} priority />
              <Image className="inline-block align-middle ml-3" alt="logo" height={40} src={logoText} priority></Image>
            </Link>
          </div>

          <div className="hidden md:flex md:gap-x-20 items-center">
            {HEADER_LINKS.map(({ href, label, target }) => (
              <NavLink key={label} href={href} target={target}>
                {label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="flex items-center space-x-8" style={{ height: '80px' }}>
            <ConnectWallet 
                  className={`${isConnected ? 'border-none bg-black-main text-white' : 'p-2 text-white'}`}
                  theme={"light"}
                  switchToActiveChain={true}
                  modalSize={"compact"}
                  modalTitleIconUrl={""}
            />
            </div>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
