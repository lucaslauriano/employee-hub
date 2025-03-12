'use server';

import Button from '@/components/Button';
import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function EmployeesPage() {
  const employees = await prisma.employee.findMany({
    include: {
      department: {
        select: {
          name: true,
        },
      },
    },
  });

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
              Add employee
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
                    className='py-3.5 pl-8 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-8'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-200'
                  >
                    Email
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
                  <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-zinc-700 bg-zinc-800'>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan={5} className='text-center py-10 text-gray-200'>
                      No employees
                    </td>
                  </tr>
                ) : (
                  employees.map((employee) => (
                    <tr key={employee.id}>
                      <td className='whitespace-nowrap py-5 pl-8 pr-3 text-sm sm:pl-8'>
                        <div className='flex items-center'>
                          <div className='font-medium text-gray-200'>
                            {employee.firstName} {employee.lastName}
                          </div>
                        </div>
                      </td>
                      <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-200'>
                        {employee.email}
                      </td>
                      <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-200'>
                        {employee.phone || '-'}
                      </td>
                      <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-200'>
                        {employee.department?.name || 'No department'}
                      </td>
                      <td className='relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                        <Link href={`/employees/${employee.id}`}>
                          <PencilIcon
                            className='h-5 w-5 text-gray-200 hover:text-gray-400'
                            aria-hidden='true'
                          />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
