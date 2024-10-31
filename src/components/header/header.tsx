import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { HiMenu, HiX, HiPhone } from 'react-icons/hi';
import ThemeToggle from '@/components/theme-toggle';
import { Container } from '@/components/ui/container';
import { Dropdowns } from '@/components/header/dropdowns';
import { MobileDropdowns } from '@/components/header/mobileDropdowns';
import Button from '@/components/ui/button';
import Logo from '@/assets/Prameya.svg';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Header = () => {
  return (
    <Container>
      <Disclosure as='nav' className=''>
        {({ open }) => (
          <>
            <div className='font-poppins mx-auto max-w-7xl px-2 py-2.5'>
              <div className='flex h-16 items-center justify-between'>
                <div className='flex px-2 lg:px-0'>
                  <Link href={'/'}>
                    <div className='flex flex-shrink-0 items-center'>
                      <Image
                        className='block h-10 w-auto lg:hidden'
                        src='https://prameyahealth.com/wp-content/uploads/2021/09/PrameyaLogo.png'
                        alt='Workflow'
                        width={500}
                        height={500}
                      />
                      <Image
                        className='hidden h-12 w-auto lg:block'
                        src={Logo}
                        alt='Workflow'
                        width={500}
                        height={500}
                      />
                    </div>
                  </Link>
                </div>
                <div className='hidden xl:flex'>
                  <Dropdowns />
                </div>
                <div className='flex items-center xl:hidden'>
                  {/* Mobile menu button */}
                  <DisclosureButton className='inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-500'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <HiX className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <HiMenu className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </DisclosureButton>
                </div>
                <div className='hidden lg:ml-4 lg:items-center xl:flex'>
                  <ThemeToggle />

                  {/* Profile dropdown */}
                  <Button className='relative ml-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-zinc-700 text-white dark:bg-zinc-600'>
                    <HiPhone className='text-2xl' />
                  </Button>
                </div>
              </div>
            </div>

            <DisclosurePanel className='xl:hidden'>
              <MobileDropdowns />
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </Container>
  );
};

export default Header;
