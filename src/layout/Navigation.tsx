'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react';

import {
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

import { classy } from '@/helpers/classy';
import Topbar from '@/layout/Topbar';
import Image from 'next/image';
import Sidebar from '@/layout/Sidebar';
import { usePathname } from 'next/navigation';

const getNavigation = (pathname: string) => [
  {
    name: 'Dashboard',
    href: '/dashboard/home',
    icon: HomeIcon,
    current: pathname === '/dashboard/home',
  },
  {
    name: 'Employees',
    href: '/dashboard/employees',
    icon: UsersIcon,
    current: pathname.startsWith('/dashboard/employees'),
  },
  {
    name: 'Departments',
    href: '/dashboard/departments',
    icon: BuildingOfficeIcon,
    current: pathname.startsWith('/dashboard/departments'),
  },
];

type NavigationProps = {
  children: React.ReactNode;
};

const Navigation = ({ children }: NavigationProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const navigation = getNavigation(pathname);

  return (
    <>
      <div>
        {/* Mobile Navigation */}
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className='relative z-50 lg:hidden'
        >
          <DialogBackdrop
            transition
            className='fixed inset-0 bg-[#0a0a0b]/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
          />

          <div className='fixed inset-0 flex'>
            <DialogPanel
              transition
              className='relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full'
            >
              <TransitionChild>
                <div className='absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0'>
                  <button
                    type='button'
                    onClick={() => setSidebarOpen(false)}
                    className='-m-2.5 p-2.5'
                  >
                    <span className='sr-only'>Close Navigation</span>
                    <XMarkIcon
                      aria-hidden='true'
                      className='size-6 text-white'
                    />
                  </button>
                </div>
              </TransitionChild>

              <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-[#0a0a0b] px-6 pb-4'>
                <div className='flex h-16 shrink-0 items-center'>
                  <Image
                    alt='Your Company'
                    src='https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white'
                    width={32}
                    height={32}
                    className='h-8 w-auto'
                  />
                </div>
                <nav className='flex flex-1 flex-col'>
                  <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                    <li>
                      <ul role='list' className='-mx-2 space-y-1'>
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classy(
                                item.current
                                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                                  : 'text-gray-200 hover:bg-gray-700 hover:text-white',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                              )}
                            >
                              <item.icon
                                aria-hidden='true'
                                className={classy(
                                  item.current
                                    ? 'text-white'
                                    : 'text-gray-200 group-hover:text-white',
                                  'size-6 shrink-0'
                                )}
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>

                    <li className='mt-auto'>
                      <a
                        href='#'
                        className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-200 hover:bg-gray-700 hover:text-white'
                      >
                        <Cog6ToothIcon
                          aria-hidden='true'
                          className='size-6 shrink-0 text-gray-200 group-hover:text-white'
                        />
                        Settings
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Desktop Navigation */}
        <Sidebar navigation={navigation} />

        <div className='lg:pl-72'>
          <Topbar setSidebarOpen={setSidebarOpen} />
          <main className='py-10'>
            <div className='px-4 sm:px-6 lg:px-8'>{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Navigation;
