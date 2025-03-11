'use client';

import Button from '@/components/Button';
import { PencilIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

//TODO: Replace with real data
const employees = [
  {
    name: 'Lindsay Walton',
    role: 'Front-end Developer',
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    phone: '+1-202-555-0170',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export default function EmployeesPage() {
  return (
    <div className='px-4 sm:px-6 lg:px-8 bg-zinc-900'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold text-gray-200'>Employees</h1>
          <p className='mt-2 text-sm text-gray-200'>
            A list of all the employees.
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <Link href='/employees/new'>
            <Button size='sm' icon='plus' iconPosition='right'>
              Add user
            </Button>
          </Link>
        </div>
      </div>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-0'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-200'
                  >
                    Phone
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-200'
                  >
                    Department
                  </th>

                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-200'
                  >
                    Role
                  </th>
                  <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-zinc-700 bg-zinc-800'>
                {employees.map((item) => (
                  <tr key={item.email}>
                    <td className='whitespace-nowrap py-5 px-4 text-sm sm:px-4'>
                      <div className='flex items-center'>
                        <div className='size-11 shrink-0'>
                          <Image
                            alt=''
                            width={32}
                            height={32}
                            src={item.image}
                            className='size-11 rounded-full'
                          />
                        </div>
                        <div className='ml-4'>
                          <div className='font-medium text-gray-200'>
                            {item.name}
                          </div>
                          <div className='mt-1 text-gray-200'>{item.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className='whitespace-nowrap px-3 py-5 text-sm'>
                      <span className='inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  '>
                        {item.phone}
                      </span>
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-200'>
                      <div className='text-gray-200'>{item.role}</div>
                      <div className='mt-1 text-gray-200'>
                        {item.department}
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-200'>
                      {item.role}
                    </td>
                    <td className='relative whitespace-nowrap py-5 text-right text-sm font-medium sm:pr-4 pr-4'>
                      <a href='#' className='text-gray-200 hover:text-gray-200'>
                        <PencilIcon className='h-5 w-5' aria-hidden='true' />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
