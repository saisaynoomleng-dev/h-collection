'use client';

import Link from 'next/link';
import { CiGift, CiShoppingBasket } from 'react-icons/ci';
import BrandLogo from '../BrandLogo';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';
import SearchBar from './SearchBar';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

const NAV_LINKS = [
  { name: 'Shop', url: '/shop' },
  { name: 'About', url: '/about-us' },
  { name: 'Journal', url: '/blog' },
  { name: 'Contact', url: '/contact-us' },
  { name: 'FAQs', url: '/faq' },
];

const MainHeader = () => {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [navOpen]);

  return (
    <header className="px-3 md:px-5 lg:max-w-300 lg:mx-auto py-5 font-jost">
      {/* desktop view */}
      <div className="flex-col hidden md:flex gap-y-6">
        <div className="flex justify-between items-center">
          <SearchBar />

          <div className="flex items-center gap-x-3">
            <Link href="/buy-gift-card">
              <CiGift className="size-6" />
            </Link>
            <Link href="/cart">
              <CiShoppingBasket className="size-6" />
            </Link>
            {isSignedIn ? (
              <Link href="/user">
                <Image
                  src={user.imageUrl}
                  alt={`${user.firstName}'s photo` || ''}
                  loading="lazy"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </Link>
            ) : (
              <Link href="/sign-in">Sign In</Link>
            )}
          </div>
        </div>
        <div className="self-center">
          <Link href="/">
            <BrandLogo />
          </Link>
        </div>

        <nav
          className="flex justify-around items-center"
          role="navigation"
          aria-label="main menu"
        >
          {NAV_LINKS.map((link) => (
            <Link
              href={link.url}
              key={link.url}
              className={clsx(
                '',
                pathname === link.url && 'font-medium text-brand-pink',
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="divider"></div>
      </div>

      {/* mobile view */}
      <div className="flex flex-col md:hidden gap-y-5">
        <SearchBar />

        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <BrandLogo />
            </Link>
          </div>

          <div className="flex items-center gap-x-3">
            <Link href="/buy-gift-card">
              <CiGift className="size-6" />
            </Link>
            <Link href="/cart">
              <CiShoppingBasket className="size-6" />
            </Link>
            <Button
              className="bg-transparent text-brand-black relative z-20"
              onClick={() => setNavOpen((prevOpen) => !prevOpen)}
              aria-controls="mobile-nav"
              aria-label={navOpen ? 'Open Main Menu' : 'Close Main Menu'}
            >
              {navOpen ? <IoClose /> : <RxHamburgerMenu />}
            </Button>
          </div>

          <nav
            id="mobile-nav"
            className={clsx(
              'flex flex-col fixed inset-0 left-[20vw] bg-brand-white pt-20 items-center gap-y-5 z-10 duration-200 transition-all ease-in-out shadow',
              navOpen ? 'translate-0' : 'translate-x-full',
            )}
            role="navigation"
            aria-label="main menu"
          >
            {NAV_LINKS.map((link) => (
              <Link
                href={link.url}
                key={link.url}
                onClick={() => setNavOpen(false)}
                className={clsx(
                  '',
                  pathname === link.url && 'font-medium text-brand-pink',
                )}
              >
                {link.name}
              </Link>
            ))}
            {isSignedIn ? (
              <Link href="/user" onClick={() => setNavOpen(false)}>
                <Image
                  src={user.imageUrl}
                  alt={`${user.firstName}'s photo` || ''}
                  loading="lazy"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </Link>
            ) : (
              <Link href="/sign-in" onClick={() => setNavOpen(false)}>
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
