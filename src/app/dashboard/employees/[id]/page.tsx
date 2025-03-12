'use client';

import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { IEmployeeForm } from '@/types/employees';
import { Employee } from '@prisma/client';
import EmployeeForm from '@/app/dashboard/employees/_components/EmployeeForm';
import { updateEmployee } from '@/actions/employees/actions';

export default function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = use(params).id;
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch(`/api/employees/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEmployee(data.employee);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (data: IEmployeeForm) => {
    const result = await updateEmployee(id, data);

    if (result.success) {
      router.push('/dashboard/employees');
      router.refresh();
      return;
    }

    if (typeof result.error === 'object') {
      setErrors(result.error);
    } else {
      console.error('Failed to update employee:', result.error);
    }
  };

  if (!employee) {
    return <div className='text-white'>Loading...</div>;
  }

  return (
    <EmployeeForm
      employee={employee}
      onSubmit={handleSubmit}
      serverErrors={errors}
    />
  );
}
