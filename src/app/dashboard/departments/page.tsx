'use server';

import Button from '@/components/Button';
import Link from 'next/link';
import { findDepartmentsWithManagers } from '../../../actions/departments/services';
import DepartmentsTable from '@/app/dashboard/departments/_components/DepartmentsTable';

export default async function DepartmentsPage() {
  const departments = await findDepartmentsWithManagers();

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold text-gray-900'>Departments</h1>
          <p className='mt-2 text-sm text-gray-900'>
            A list of all the departments.
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <Link href='/dashboard/departments/new'>
            <Button size='sm' icon='plus' iconPosition='right'>
              Add department
            </Button>
          </Link>
        </div>
      </div>
      <DepartmentsTable departments={departments} />
    </div>
  );
}
