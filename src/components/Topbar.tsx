import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline';

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
];

type TopbarProps = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Topbar = ({ setSidebarOpen }: TopbarProps) => {
  return (
    <div className='sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-zinc-200 bg-zinc-100 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8'>
      <button
        type='button'
        onClick={() => setSidebarOpen(true)}
        className='-m-2.5 p-2.5 text-zinc-700 lg:hidden'
      >
        <span className='sr-only'>Open sidebar</span>
        <Bars3Icon aria-hidden='true' className='size-6' />
      </button>

      {/* Separator */}
      <div aria-hidden='true' className='h-6 w-px bg-[#0a0a0b]/10 lg:hidden' />

      <div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
        <div className='grid flex-1 grid-cols-1'></div>
        <div className='flex items-center gap-x-4 lg:gap-x-6'>
          {/* Separator */}
          <div
            aria-hidden='true'
            className='hidden lg:block lg:h-6 lg:w-px lg:bg-[#0a0a0b]/10'
          />

          {/* Profile dropdown */}
          <Menu as='div' className='relative'>
            <MenuButton className='-m-1.5 flex items-center p-1.5'>
              <span className='sr-only'>Open user menu</span>
              <img
                alt=''
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                className='size-8 rounded-full bg-zinc-50'
              />
              <span className='hidden lg:flex lg:items-center'>
                <span
                  aria-hidden='true'
                  className='ml-4 text-sm/6 font-semibold text-[#0a0a0b]'
                >
                  Tom Cooks
                </span>
                <ChevronDownIcon
                  aria-hidden='true'
                  className='ml-2 size-5 text-zinc-400'
                />
              </span>
            </MenuButton>
            <MenuItems
              transition
              className='absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-[#0a0a0b]/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
            >
              {userNavigation.map((item) => (
                <MenuItem key={item.name}>
                  <a
                    href={item.href}
                    className='block px-3 py-1 text-sm/6 text-[#0a0a0b] data-[focus]:bg-zinc-50 data-[focus]:outline-none'
                  >
                    {item.name}
                  </a>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
