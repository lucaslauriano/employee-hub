'use client';

import { IEmployeeForm } from '@/types/employees';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EmployeeForm from '@/app/dashboard/employees/_components/EmployeeForm';
import { createEmployee } from '@/actions/employees/actions';

const NewEmployeePage = () => {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  async function handleSubmit(data: IEmployeeForm) {
    const result = await createEmployee(data);

    if (result.success) {
      router.push('/employees');
      router.refresh();
      return;
    }

    if (typeof result.error === 'object') {
      setErrors(result.error);
    } else {
      console.error('Failed to create employee:', result.error);
    }
  }

  return <EmployeeForm onSubmit={handleSubmit} serverErrors={errors} />;
};

export default NewEmployeePage;
