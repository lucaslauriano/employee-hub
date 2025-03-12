'use client';

import { Employee } from '@prisma/client';
import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type EmployeeWithDepartment = Employee & {
  department: {
    name: string;
  } | null;
};

interface EmployeesTableProps {
  employees: EmployeeWithDepartment[];
}

export default function EmployeesTable({ employees }: EmployeesTableProps) {
  return (
    <div className='mt-8 flow-root'>
      <div className='overflow-x-auto md:overflow-x-visible'>
        <div className='inline-block min-w-full py-2 align-middle  mt-10 ring-1 ring-gray-300 sm:rounded-lg'>
          <table className='min-w-full divide-y divide-gray-300'>
            <thead>
              <tr>
                <th
                  scope='col'
                  className='py-3.5 pl-8 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-8'
                >
                  Name
                </th>
                <th
                  scope='col'
                  className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                >
                  Email
                </th>
                <th
                  scope='col'
                  className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                >
                  Phone
                </th>
                <th
                  scope='col'
                  className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                >
                  Department
                </th>
                <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                  <span className='sr-only'>Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-300 bg-white'>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan={5} className='text-center py-10 text-gray-900'>
                    No employees
                  </td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className='whitespace-nowrap py-5 pl-8 pr-3 text-sm sm:pl-8'>
                      <div className='flex items-center'>
                        <div className=' text-gray-600'>
                          {employee.firstName} {employee.lastName}
                        </div>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-600'>
                      {employee.email}
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-600'>
                      {employee.phone || '-'}
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-600'>
                      {employee.department?.name || 'No department'}
                    </td>
                    <td className='relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                      <Link href={`/dashboard/employees/${employee.id}`}>
                        <PencilIcon
                          className='h-5 w-5 text-gray-900 hover:text-gray-400'
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
  );
}
