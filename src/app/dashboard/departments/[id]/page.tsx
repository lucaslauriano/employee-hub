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
      try {
        const response = await fetch(`/api/departments/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDepartment(data.department);
        } else {
          const error = await response.json();
          console.error('Failed to fetch department:', error);
        }
      } catch (error) {
        console.error('Error fetching department:', error);
      }
    };
    fetchDepartment();
  }, [id]);

  const handleSubmit = async (data: IDepartmentForm) => {
    try {
      const result = await fetch('/api/departments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name: data.name,
          managerId: data.managerId,
        }),
      });

      const responseData = await result.json();

      if (result.ok) {
        router.push('/dashboard/departments');
        router.refresh();
        return;
      }

      if (responseData.error) {
        if (typeof responseData.error === 'object') {
          setErrors(responseData.error);
        } else {
          setErrors({
            form: [responseData.error],
          });
        }
      }
    } catch (error) {
      console.error('Error updating department:', error);
      setErrors({
        form: ['Failed to update department. Please try again.'],
      });
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
