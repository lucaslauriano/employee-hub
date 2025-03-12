'use client';

import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { type DepartmentWithManager } from '../queries';

interface DepartmentsTableProps {
  departments: DepartmentWithManager[];
}

export default function DepartmentsTable({
  departments,
}: DepartmentsTableProps) {
  return (
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
                  Manager
                </th>
                <th
                  scope='col'
                  className='px-3 py-3.5 text-left text-sm font-semibold text-gray-200'
                >
                  Employees Count
                </th>
                <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                  <span className='sr-only'>Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-zinc-700 bg-zinc-800'>
              {departments.length === 0 ? (
                <tr>
                  <td colSpan={4} className='text-center py-10 text-gray-200'>
                    No departments
                  </td>
                </tr>
              ) : (
                departments?.map((department) => (
                  <tr key={department.id}>
                    <td className='whitespace-nowrap py-5 pl-8 pr-3 text-sm sm:pl-8'>
                      <div className='flex items-center'>
                        <div className='font-medium text-gray-200'>
                          {department.name}
                        </div>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-200'>
                      {department.manager_first_name
                        ? `${department.manager_first_name} ${department.manager_last_name}`
                        : 'No manager assigned'}
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-200'>
                      {Number(department.employee_count)}
                    </td>
                    <td className='relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                      <Link href={`/departments/${department.id}`}>
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
  );
}
