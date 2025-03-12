'use server';

import Button from '@/components/Button';
import Link from 'next/link';
import EmployeesTable from './_components/EmployeesTable';
import { findAllEmployees } from '../../../actions/employees/services';

export default async function EmployeesPage() {
  const employees = await findAllEmployees();

  return (
    <div className='px-4 sm:px-6 lg:px-8 bg-white'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold text-gray-900'>Employees</h1>
          <p className='mt-2 text-sm text-gray-800'>
            A list of all the employees.
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <Link href='/dashboard/employees/new'>
            <Button size='sm' icon='plus' iconPosition='right'>
              Add employee
            </Button>
          </Link>
        </div>
      </div>
      <EmployeesTable employees={employees} />
    </div>
  );
}
