import { classy } from '@/helpers/classy';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';

interface SidebarProps {
  navigation: {
    name: string;
    href: string;
    icon: React.ElementType;
    current: boolean;
  }[];
  teams: {
    id: number;
    name: string;
    href: string;
    initial: string;
    current: boolean;
  }[];
}

const Sidebar = ({ navigation, teams }: SidebarProps) => {
  return (
    <>
      <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
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
                            ? 'bg-zinc-700 text-white'
                            : 'text-zinc-200 hover:bg-zinc-700 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                        )}
                      >
                        <item.icon
                          aria-hidden='true'
                          className={classy(
                            item.current
                              ? 'text-white'
                              : 'text-zinc-200 group-hover:text-white',
                            'size-6 shrink-0'
                          )}
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className='text-xs/6 font-semibold text-zinc-200'>
                  Teams
                </div>
                <ul role='list' className='-mx-2 mt-2 space-y-1'>
                  {teams.map((team) => (
                    <li key={team.name}>
                      <a
                        href={team.href}
                        className={classy(
                          team.current
                            ? 'bg-zinc-700 text-white'
                            : 'text-zinc-200 hover:bg-zinc-700 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                        )}
                      >
                        <span className='flex size-6 shrink-0 items-center justify-center rounded-lg border border-zinc-400 bg-zinc-500 text-[0.625rem] font-medium text-white'>
                          {team.initial}
                        </span>
                        <span className='truncate'>{team.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className='mt-auto'>
                <a
                  href='#'
                  className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-zinc-200 hover:bg-zinc-700 hover:text-white'
                >
                  <Cog6ToothIcon
                    aria-hidden='true'
                    className='size-6 shrink-0 text-zinc-200 group-hover:text-white'
                  />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
