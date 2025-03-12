'use client';

import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { Departments } from '@prisma/client';
import DepartmentForm from '@/app/dashboard/departments/_components/DepartmentForm';

interface IDepartmentForm {
  name: string;
  managerId: string | null;
}

export default function EditDepartmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = use(params).id;
  const [department, setDepartment] = useState<Departments | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchDepartment = async () => {
      const response = await fetch(`/api/departments/${id}`);
      if (response.ok) {
        const data = await response.json();
        setDepartment(data.department);
      }
    };
    fetchDepartment();
  }, [id]);

  const handleSubmit = async (data: IDepartmentForm) => {
    const result = await fetch('/api/departments', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, id: id }),
    });

    if (result.ok) {
      router.push('/dashboard/departments');
      router.refresh();
      return;
    }

    const error = await result.json();
    if (typeof error === 'object') {
      setErrors(error);
    } else {
      console.error('Failed to update department:', error);
    }
  };

  if (!department) {
    return <div className='text-white'>Loading...</div>;
  }

  return (
    <DepartmentForm
      department={department}
      onSubmit={handleSubmit}
      serverErrors={errors}
    />
  );
}
